'use strict';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as appActions from './../../actions/app';
import AppLogo from './../AppLogo';

class ResultHeader extends Component {
    render() {
        return (
            <div className='results-list-header'>
                <a href='#' onClick={this._handleBack.bind(this)}>
                    <div className='back-button'>
                        <svg xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' width='20px' height='30px' viewBox='0 0 20 30'>
                            <path d='M13,24c-0.256,0-0.512-0.098-0.707-0.293l-8-8c-0.391-0.391-0.391-1.023,0-1.414l8-8 c0.391-0.391,1.023-0.391,1.414,0s0.391,1.023,0,1.414L6.414,15l7.293,7.293c0.391,0.391,0.391,1.023,0,1.414 C13.512,23.902,13.256,24,13,24z'/>
                        </svg>
                    </div>
                    <AppLogo width={'170px'} height={'70px'} className='header-logo'/>
                </a>
            </div>
        );
    }

    _handleBack(event) {
        event.preventDefault();
        this.props.goToHome();
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(
    mapStateToProps,
    {
        goToHome: appActions.navigateToHome
    }
)(ResultHeader);
