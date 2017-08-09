import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchSurveys} from '../../actions';

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

    renderSurveys() {
        return this
            .props
            .surveys
            .reverse()
            .map(survey => {
                return (
                    <div className="card darken-1">
                        <div className="card-content">
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
export default connect(mapStateToProps, {fetchSurveys})(SurveyList);