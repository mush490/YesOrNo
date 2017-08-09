const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const ipfilter = require('express-ipfilter').IpFilter;

require('./models/User.js');
require('./models/Survey.js');
require('./services/passport');
 
// Blacklist the following IPs 
var ips = ['127.0.0.1']; 

mongoose.connect(keys.mongoURI);

const app = express();
//app.use(ipfilter(ips));
app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    // Express will serve up production assets
    // like main.js or main.css
    app.use(express.static('client/build'));

    // Express will serve up index.html if
    // it doesn't recognize the route
    const path = require('path');
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
