import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router';
import _ from 'lodash';
import * as actions from '../../actions';

const SurveyFormReview = (props) => {
    const reviewFields = _.map(formFields, ({label,name}) => {
            return (
                <div key={name}>
                    <label>{label}</label>
                    <div>{props.formValues[name]}</div>
                </div>
            );
    });

    return (
        <div>
            <h5>Please confirm your entries</h5>
            {reviewFields}
            <button type="submit" onClick={props.onCancel} className="yellow btn-flat white-text darken-3">
                Back
            </button>
            <button onClick={() => props.submitSurvey(props.formValues, props.history)} type="submit" className="green btn-flat right">
                Send Survey
                <i className="material-icons right">email</i>
            </button>

        </div>
    );
};
function mapStateToProps(state){
    console.log(state.form.surveyForm.values);
    return { formValues: state.form.surveyForm.values};
}
export default connect(mapStateToProps,actions)(withRouter(SurveyFormReview));