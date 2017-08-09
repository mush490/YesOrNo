// SurveyNew shows SurveyForm and SurveyFormReview
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {

    constructor (){
        super();

        this.state = { showReview: false };
    }

    renderContent(){
        if (this.state.showReview){
            return <SurveyFormReview
                        onCancel={() => this.setState({ showReview : false })} />;
        }

        return <SurveyForm onSurveySubmit={() => this.setState({ showReview: true })} />;
    }
    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

// connecting this to the parent form component 
// causes the values to get dumped when the component is unmounted
// which is our desired behavior
export default reduxForm({
    form: 'surveyForm'  
})(SurveyNew);