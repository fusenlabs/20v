import React, {Component} from 'react';
import PlayerManager from './components/player/PlayerManager';
import {connect} from 'react-redux';
import * as searchActions from './actions/search';
import * as playerActions from './actions/player';

class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let player = this.props.showPlayer? this._getPlayer() : null;
        let triggerDisplayStyle = { display: this.props.resultList.length != 0? 'block' : 'none' };
        return <div>
            <input type='text' ref='searchBox' onKeyPress={this._handleKeyPress.bind(this)}/>
            <span>{this.props.searchText}</span>
            <span>{this.props.resultList.length}</span>
            <button onClick={this._handleStartPlaying.bind(this)} style={triggerDisplayStyle}>Start TV Channel</button>
            {player}
        </div>;
    }

    _getPlayer() {
        return(
            <PlayerManager onClose={this._handleStopPlaying.bind(this)} playlist={this._getFormattedList.bind(this)(this.props.resultList)}></PlayerManager>
        )
    }

    _handleStartPlaying() {
        this.props.openPlayer();
    }

    _handleStopPlaying() {
        this.props.closePlayer();
    }

    _getFormattedList( spotifyList ) {
        return spotifyList.map( track => {
            return track.name + ' - ' + track.artists[0].name.substring(0,40);
        });
    }

    _handleKeyPress(event) {
        if (event.key === 'Enter') {
            this.props.fetchSearch(this.refs.searchBox.value);
        }
    }
}

function mapStateToProps(state) {
    const {search,player} = state;
    return {
        searchText: search.searchText,
        resultList: search.resultList,
        showPlayer: player.isOpen
    };
}

export default connect(
    mapStateToProps,
    {
        fetchSearch: searchActions.fetchSearch,
        openPlayer: playerActions.openPlayer,
        closePlayer: playerActions.closePlayer
    }
)(App);
