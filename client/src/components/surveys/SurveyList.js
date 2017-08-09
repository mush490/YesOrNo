import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchSurveys, deleteSurvey} from '../../actions';
import ReactConfirmAlert, { confirmAlert } from 'react-confirm-alert'; // Import 
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css 
 
class SurveyList extends Component {
    componentDidMount() {
        this
            .props
            .fetchSurveys();
    }

    render() {
        return (
            <div>
                {this.renderSurveys()}
            </div>
        )
    };
    deleteSurvey(surveyId){
        confirmAlert({
            title: 'Confirm Delete',                        // Title dialog 
            message: 'Are you sure to delete this Survey?.',               // Message dialog 
            childrenElement: () => <div>Custom UI</div>,       // Custom UI or Component 
            confirmLabel: 'Confirm',                           // Text button confirm 
            cancelLabel: 'Cancel',                             // Text button cancel 
            onConfirm: () => alert('Action after Confirm'),    // Action after Confirm 
            onCancel: () => alert('Action after Cancel'),      // Action after Cancel 
            })
    }
    renderSurveys() {
        return this
            .props
            .surveys
            .reverse()
            .map(survey => {
                return (
                    <div key={survey._id} className="card grey lighten-4 hoverable">
                        <div className="card-content">
                            <p className="right"><i className="small material-icons" style={{cursor: 'pointer'}} onClick={() => this.editSurvey(survey._id)}>edit</i><i className="small material-icons" style={{cursor: 'pointer'}} onClick={() => this.deleteSurvey(survey._id)}>delete</i></p>
                            
                            <span className="card-title">{survey.title}</span>
                            <p>{survey.body}</p>
                            <p className="right">
                                Sent On: {new Date(survey.dateSent).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="card-action">
                            <a>YES: {survey.yes}</a>
                            <a>NO: {survey.no}</a>
                        </div>
                    </div>
                );
            });
    }
};
function mapStateToProps(state) {
    return {surveys: state.surveys};
}
export default connect(mapStateToProps, {fetchSurveys,deleteSurvey})(SurveyList);