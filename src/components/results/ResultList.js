'use strict';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as searchActions from './../../actions/search';

class ResultList extends Component {
    render() {
        return (
            <div className={'results-list' + (this.props.isSearching ? 'search-mask' : '') }>
                <span>{this.props.resultList.length}</span>
                <ul>
                    {this.props.resultList.map(track => {
                        return (
                            <li key={track.id}>{track.name} - ({track.artists[0].name})</li>
                        );
                    })}
                </ul>
            </div>
        );
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
    }
)(ResultList);
