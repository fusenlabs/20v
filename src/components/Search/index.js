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

        let handleKeyPress = (event) => {
            if (event.key === 'Enter') {
                const text = event.target.value;
                if (text.length > 3) {
                    this.props.fetchSearch(text);
                    ga('send', 'event', 'key', 'press', 'search-box-enter');
                }
            }
        };

        const disabled = this.props.isSearching ? { disabled: 'disabled' } : {};
        const inputAttributes = Object.assign({
            id: 'search-input',
            type: 'text',
            ref: 'searchInput',
            className: 'input-search',
            placeholder: 'Type a song name and select an option',
            onKeyPress: handleKeyPress.bind(this)
        }, disabled);
        return (
            <div className={'search-wrapper ' + (this.props.isSearching ? 'search-mask' : '') }>
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
                <img src="images/search.svg" className="search-icon" />
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
