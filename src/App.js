import React, { Component } from 'react';// eslint-disable-line no-unused-vars
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';// eslint-disable-line no-unused-vars
import PlayerManager from './components/PlayerManager';// eslint-disable-line no-unused-vars
import Search from './components/Search';// eslint-disable-line no-unused-vars
import Footer from './components/Footer';// eslint-disable-line no-unused-vars
import Header from './components/Header';// eslint-disable-line no-unused-vars
import Share from './components/Share';// eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import * as playerActions from './actions/player';
import * as appActions from './actions/app';
import { VIEWS, IS_IPHONE } from './constants/app';

class App extends Component {
    constructor(props) {
        super(props);
        this._handleStopPlaying = this._handleStopPlaying.bind(this);
        this._getFormattedList = this._getFormattedList.bind(this);
        this._isIPhone = IS_IPHONE;
    }

    render() {
        let iPhoneClass = this._isIPhone ? 'iphone' : '';
        return (
            <div className={`app-inner-wrapper ${iPhoneClass}`}>
                <ReactCSSTransitionGroup
                    transitionName="screen-fade"
                    transitionAppear
                    transitionAppearTimeout={500}
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}
                >
                    { this.props.view === VIEWS.HOME ? this._getHomeLayout() : null }
                    { this.props.view === VIEWS.RESULTS ? this._getResultsLayout() : null }
                    { this.props.view === VIEWS.PLAYER ? this._getPlayerLayout() : null }
                </ReactCSSTransitionGroup>
            </div>
        );
    }

    _getHomeLayout() {
        return (
            <div className="home-wrapper" key={this.props.view}>
                <Footer/>
                <Share/>
                <div className="home-body">
                    <img src="/images/logo.svg" className="intro-logo"/>
                    <p className="intro-text">
                        Create and enjoy a custom music channel based on a single song
                    </p>
                    <Search/>
                </div>
            </div>
        );
    }

    _getResultsLayout() {
        return (
            <div className="results-wrapper" key={this.props.view}>
                <Header/>
                <ResultHeader/>
                <ResultList/>
                <Footer/>
            </div>
        );
    }

    _getPlayerLayout() {
        return (
            <div className="player-wrapper" key={this.props.view}>
                <PlayerManager
                    onClose={this._handleStopPlaying}
                    playlist={this._getFormattedList(this.props.resultList)}
                />
            </div>
        );
    }

    _handleStopPlaying() {
        this.props.goToHome();
    }

    _getFormattedList(spotifyList) {
        return spotifyList.map(track => {
            let song = track.name;
            let artist = track.artists[0].name.substring(0, 40);
            return `${song} - ${artist} official vevo`;
        });
    }

}

function mapStateToProps(state) {
    const { app, search, player } = state;
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
        goToHome: appActions.navigateToHome
    }
)(App);
