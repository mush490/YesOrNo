const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const Survey = mongoose.model('surveys');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

module.exports = app => {
    app.get('/api/surveys', requireLogin, async (req, res) => {
        const surveys = await Survey.find({ _user: req.user.id })
            .select({ recipients: false
            });
        res.send(surveys);
    });

    app.get('/api/surveys/:surveyid/:choice', (req, res) => {
        res.send('Thanks for voting!');
    });

    app.delete('/api/surveys/:surveyid', requireLogin, async (req, res) => {
        console.log(req.params.surveyid);
        
        const survey = await Survey.findByIdAndRemove(req.params.surveyid, function (err, survey) {  
        // We'll create a simple object to send back with a message and the id of the document that was removed
        // You can really do this however you want, though.
        console.log(err);
        var response = {
            message: "Todo successfully deleted",
            id: req.params.surveyid
        };
        res.send(response);
    })});

    app.post('/api/surveys/webhooks', (req, res) => {

        const p = new Path('/api/surveys/:surveyId/:choice');

        const events = _.chain(req.body)
            .map((event) => {
                const match = p.test(new URL(event.url).pathname);
                if (match){
                    return { email: event.email, surveyId: match.surveyId, choice: match.choice};
                }
            })
            .compact()
            .uniqBy('email', 'surveyId')
            .each(event =>{
                Survey.updateOne({
                    _id: event.surveyId,
                    recipients: {
                        $elemMatch: { email: event.email, responded: false }
                    }
                }, {
                    $inc: { [event.choice]: 1 },
                    $set: { 'recipients.$.responded': true }
                }).exec();
            })
            .value();

        console.log(events);
        res.send({});
    });

    app.post('/api/surveys', requireLogin, requireCredits, async(req, res) => {
        const {title, subject, body, recipients} = req.body;

        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients
                .split(',')
                .map(email => ({
                    email: email.trim()
                })),
            _user: req.user.id,
            dateSent: Date.now()
        });

        const mailer = new Mailer(survey, surveyTemplate(survey));

        try {
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req
                .user
                .save();

            res.send(user);
        } catch (err) {
            res
                .status(422)
                .send(err);
        }

    });

};