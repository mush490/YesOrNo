import React, { Component } from 'react';
import { Redirect, BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './Header';
import Landing from './Landing';
import * as actions from '../actions';

import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

class App extends Component {

    componentDidMount() {
        this.props.fetchUser();
    }

    render(){
        const Dash = () => {
            return <Dashboard user={this.props.user} />
        };

        return (
            <div className="container">
                <BrowserRouter>
                    <div className="container">
                        <Header />
                        {/* <Route exact path="/" component={Landing} /> */}
                        <Route exact path="/" render={() => (
                            this.props.user ? (
                                <Redirect to="/surveys"/>
                            ) : (
                                <Landing/>
                            )
                            )}/>
                        <Route exact path="/surveys" component={Dash} />
                        <Route exact path="/surveys/new" component={SurveyNew} />
                    </div>
                </BrowserRouter>
            </div>
        );
    };
};

function mapStateToProps(state) {
    return {user: state.auth};
}

export default connect(mapStateToProps,actions)(App);