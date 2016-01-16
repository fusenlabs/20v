'use strict';
import React, { Component } from 'react';// eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest';// eslint-disable-line no-unused-vars
import * as searchActions from './../../actions/search';
import Spotify from './../../core/Spotify';

class Search extends Component {
    componentDidMount() {
        this._setInitialUIState();
    }

    render() {
        let time;
        let getSuggestions = (input, callback) => {
            if (time) {
                clearTimeout(time);
            }
            time = setTimeout(() => {
                Spotify.autocomplete(input, 'AR').then((tracks) => {
                    callback(null, tracks);
                });
            }, 500);
        };

        let suggestionRenderer = (track) => {
            return <span key={track.id}>{track.name}, {track.artists.first().name}</span>;
        };

        let getSuggestionValue = (track) => {
            return `${track.name}, ${track.artists.first().name}`;
        };

        let showWhen = (input) => {
            return input.trim().length > 3;
        };

        let onSuggestionSelected = (suggestion) => {
            this.props.fetchSearch(suggestion);
            ga('send', 'event', 'event', 'new-search', suggestion);
        };
        onSuggestionSelected = onSuggestionSelected.bind(this);

        const inputAttributes = {
            id: 'search-input',
            type: 'text',
            ref: 'searchInput',
            className: 'input-search',
            placeholder: 'Type a song name and select an option'
        };
        return (
            <div className={'search-wrapper' + (this.props.isSearching ? 'search-mask' : '') }>
                <Autosuggest
                    suggestions={getSuggestions}
                    onSuggestionSelected={onSuggestionSelected}
                    inputAttributes={inputAttributes}
                    defaultValue={``}
                    suggestionRenderer={suggestionRenderer}
                    suggestionValue={getSuggestionValue}
                    showWhen={showWhen}
                    cache
                    ref="searchbox"
                />
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" className="search-icon">
                    <path fill="#CB289D" d="M23.347,21.225l-5.088-5.088c1.224-1.659,1.956-3.702,1.956-5.922c0-5.522-4.477-10-10-10s-10,4.478-10,10 s4.477,10,10,10c2.22,0,4.264-0.732,5.923-1.956l5.088,5.087c0.585,0.586,1.535,0.586,2.121,0S23.932,21.811,23.347,21.225z M3.214,10.215c0-3.866,3.134-7,7-7s7,3.134,7,7s-3.134,7-7,7S3.214,14.081,3.214,10.215z"/>
                </svg>
                <span className="hide">{this.props.searchText}</span>
            </div>
        );
    }

    _setInitialUIState() {
        this.refs.searchbox.refs.input.focus();
    }
}

function mapStateToProps(state) {
    const { search } = state;
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
