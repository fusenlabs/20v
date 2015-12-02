import React, {Component} from 'react';
import PlayerManager from './components/player/PlayerManager';
import Search from './components/search/Search';
import ResultHeader from './components/results/ResultHeader';
import ResultList from './components/results/ResultList';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import {connect} from 'react-redux';
import * as playerActions from './actions/player';
import * as appActions from './actions/app';
import {VIEWS} from './constants/app';

class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='app-inner-wrapper'>
                { this.props.view == VIEWS.HOME ?       this._getHomeLayout()     : null }
                { this.props.view == VIEWS.RESULTS ?    this._getResultsLayout()  : null }
                { this.props.view == VIEWS.PLAYER ?     this._getPlayerLayout()   : null }
            </div>
        );
    }

    _getHomeLayout() {
        return (
            <div className='home-wrapper'>
                <div className='home-body'>
                    <span>Some text here</span>
                    <Search></Search>
                    <span>Some other text here</span>
                </div>
                <Footer></Footer>
            </div>
        );
    }

    _getResultsLayout() {
        return (
            <div className='results-wrapper'>
                <Header>
                    <Search></Search>
                </Header>
                <ResultHeader></ResultHeader>
                <ResultList></ResultList>
                <Footer></Footer>
            </div>
        );
    }

    _getPlayerLayout() {
        return (
            <div className='player-wrapper'>
                <PlayerManager
                    onClose={this._handleStopPlaying.bind(this)}
                    playlist={this._getFormattedList.bind(this)(this.props.resultList)}>
                </PlayerManager>
            </div>
        );
    }

    _handleStopPlaying() {
        //this.props.closePlayer();
        this.props.goToResults();
    }

    _getFormattedList(spotifyList) {
        return spotifyList.map(track => {
            return track.name + ' - ' + track.artists[0].name.substring(0, 40);
        });
    }

}

function mapStateToProps(state) {
    const {app,search,player} = state;
    return {
        searchText: search.searchText,
        resultList: search.resultList,
        showPlayer: player.isOpen,
        view: app.view
    };
}

export default connect(
    mapStateToProps,
    {
        openPlayer: playerActions.openPlayer,
        closePlayer: playerActions.closePlayer,
        goToResults: appActions.navigateToResults
    }
)(App);
