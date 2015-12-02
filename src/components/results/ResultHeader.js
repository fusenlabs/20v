'use strict';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as searchActions from './../../actions/search';
import * as appActions from './../../actions/app';

class ResultHeader extends Component {
    render() {
        return (
            <div className='results-list-header'>
                <button onClick={this._handleStartPlaying.bind(this)}>
                    Start TV Channel
                </button>
            </div>
        );
    }

    _handleStartPlaying() {
        this.props.goToPlayer();
    }

}

function mapStateToProps(state) {
    const {search} = state;
    return {
        resultList: search.resultList,
        isSearching: search.isSearching
    };
}

export default connect(
    mapStateToProps,
    {
        goToPlayer: appActions.navigateToPlayer
    }
)(ResultHeader);
