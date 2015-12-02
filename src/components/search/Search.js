'use strict';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as searchActions from './../../actions/search';

class Search extends Component {
    render() {
        return (
            <div className={'search-wrapper' + (this.props.isSearching ? 'search-mask' : '') }>
                <input type='text' ref='searchBox'
                    onKeyPress={this._handleKeyPress.bind(this)}/>
                <span>{this.props.searchText}</span>
            </div>
        );
    }

    _handleKeyPress(event) {
        if (event.key === 'Enter') {
            this.props.fetchSearch(this.refs.searchBox.value);
        }
    }
}

function mapStateToProps(state) {
    const {search} = state;
    return {
        searchText: search.searchText,
        isSearching: search.isSearching
    };
}

export default connect(
    mapStateToProps,
    {
        fetchSearch: searchActions.fetchSearch
    }
)(Search);
