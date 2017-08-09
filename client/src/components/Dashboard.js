import React from 'react';
import {Link} from 'react-router-dom';
import SurveyList from './surveys/SurveyList';

const Dashboard = () => {
    return (
        <div>
            <div>
                <Link
                        to="/surveys/new"
                        className="right btn-floating btn-small waves-effect waves-light green"
                        style={{ margin: '10px 5px 0px 0px'}}>
                        <i className="material-icons">add</i>
                    </Link>
                    <div className="section">
                        <h5>Surveys</h5>
                    </div>
            </div>
            <SurveyList/>

        </div>
    );

};

export default Dashboard;