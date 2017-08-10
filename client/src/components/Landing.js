import React, { Component } from 'react';
import $ from 'jquery';
import 'materialize-css';

class Landing  extends Component {

    render(){
        return (
            <div>
            <div style={{ textAlign: 'center' }}>
                <h2>YesOrNO?</h2>
            </div>
            <div>
                <p>This is an example app built using React, Node, Express, and Mongodb.  The app allows you to email one question surveys to users and get feedback.  As the name of the app implies, only Yes or No questions are allowed.</p>
                <p>To get started, sign in with a Google account and Add Credits.  The credit card step is in test mode so you don't need a real credit card.  You must use the credit card #4242 4242 4242 4242 to add credits.</p>
                <p>Once you have credits, go to the <a href="/surveys">Surveys</a> page click the plus sign to add a survey.</p>
                <p>Responses to the question in each email will be reported back to this app.</p>     
            </div>
                    <a className="waves-effect waves-light btn modal-trigger" href="#modal1">Modal</a>
                    <div id="modal1" className="modal">
                        <div className="modal-content">
                        <h4>Modal Header</h4>
                        <p>A bunch of text</p>
                        </div>
                        <div className="modal-footer">
                        <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
                        </div>
                    </div>
            </div>
        );
    }
}

export default Landing;