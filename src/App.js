import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PlayerManager from './components/player/PlayerManager';
import Search from './components/search/Search';
import ResultHeader from './components/results/ResultHeader';
import ResultList from './components/results/ResultList';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import AppLogo from './components/AppLogo';
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
                <ReactCSSTransitionGroup
                    transitionName='screen-fade'
                    transitionAppear={true}
                    transitionAppearTimeout={500}
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}
                >
                    { this.props.view == VIEWS.HOME ? this._getHomeLayout() : null }
                    { this.props.view == VIEWS.RESULTS ? this._getResultsLayout() : null }
                    { this.props.view == VIEWS.PLAYER ? this._getPlayerLayout() : null }
                </ReactCSSTransitionGroup>
            </div>
        );
    }

    _getHomeLayout() {
        return (
            <div className='home-wrapper' key={this.props.view}>
                <div className='home-body'>
                    <AppLogo/>
                    <p className='intro-text'>
                        Create and enjoy a custom music channel based on a single song
                    </p>
                    <Search/>
                </div>
                <Footer></Footer>
            </div>
        );
    }

    _getResultsLayout() {
        return (
            <div className='results-wrapper' key={this.props.view}>
                <Header/>
                <ResultHeader/>
                <ResultList/>
                <Footer/>
            </div>
        );
    }

    _getPlayerLayout() {
        return (
            <div className='player-wrapper' key={this.props.view}>
                <PlayerManager
                    onClose={this._handleStopPlaying.bind(this)}
                    playlist={this._getFormattedList.bind(this)(this.props.resultList)}>
                </PlayerManager>
            </div>
        );
    }

    _handleStopPlaying() {
        this.props.goToHome();
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
        goToHome: appActions.navigateToHome
    }
)(App);
