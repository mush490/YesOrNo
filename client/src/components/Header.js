import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
    renderContent() {
        switch (this.props.auth){
            case null:
              return;
            case false:
              return (
                  <a href="/auth/google">Login With Google</a>
              );
            default:
              return [

                  <li key="0"><i className="material-icons" style={{margin: '0 20px',cursor: 'pointer'}}>help</i></li>,
                  <li key="1"><Payments /></li>,
                  <li key="3" style={{ margin: '0 10px' }}>Credits: {this.props.auth.credits} </li>,
                  <li key="2"><a href="/api/logout">Logout</a></li>
              ];
        }
    }

    render(){
        return (
            <nav>
                <div className="nav-wrapper blue darken-3">
                    <Link to={ this.props.auth ? '/surveys' : '/'} className="left brand-logo" style={{ margin: '0 10px' }}>
                        <i className="material-icons">send</i>YesOrNo?
                    </Link>

                    <ul className="right">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        );
    }
}

function mapStateToProps(state){
    return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);