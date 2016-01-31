'use strict';
import React, { Component } from 'react';// eslint-disable-line no-unused-vars
import Player, { IphonePlayer } from './Player';// eslint-disable-line no-unused-vars
import CGBand from './CGBand';// eslint-disable-line no-unused-vars
import PlayerControls, { IphoneControls } from './PlayerControls';// eslint-disable-line no-unused-vars
import { Config, Video } from 'youtube-client-wrapper';// eslint-disable-line no-unused-vars
import { YT_API_CLIENT } from 'appConfig';
import { IS_IPHONE } from './../../constants/app';

let bootYoutubeClient = () => {
    return Config.set({
        apiKey: YT_API_CLIENT
    })
    .boot();
};

let videos = new Map();
let externalList = [];
class PlayerManager extends Component {
    constructor(...props) {
        super(...props);
        this._onReadyHandler = this._onReadyHandler.bind(this);
        this._onEndHandler = this._onEndHandler.bind(this);
        this._onPauseHandler = this._onPauseHandler.bind(this);
        this._onPlayHandler = this._onPlayHandler.bind(this);
        this._onStateChangeHandler = this._onStateChangeHandler.bind(this);
        this._onCPReady = this._onCPReady.bind(this);
        this._onCPPlayPauseHandler = this._onCPPlayPauseHandler.bind(this);
        this._onCPForwardHandler = this._onCPForwardHandler.bind(this);
        this._onCPRewindHandler = this._onCPRewindHandler.bind(this);
        this._onCPSkipHandler = this._onCPSkipHandler.bind(this);
        this._onCPCloseHandler = this._onCPCloseHandler.bind(this);
        this._onIphoneCPSkipHandler = this._onIphoneCPSkipHandler.bind(this);
        this.close = this.close.bind(this);
        /* boot first, then start to process*/
        bootYoutubeClient()
            .then(() => {
                this._collectVideosId();
            });

        /* initialization*/
        this._player = null;
        this._lazyList = [];
        this._isLazy = false;
        this._currentVideoIndex = null;
        this._onScreenTimeoutIds = [];
        /* custom youtube player controls*/
        this._playerControls = null;

        /* note: when we implement resuming playing, we must
        * preserve videos map.
        * by now clear it to renew the videos map with externalPlaylist
        */
        videos = new Map();
        externalList = this.props.playlist;

        /* on-screen info configuration*/
        this._visualsOnScreen = [{
            showAt: 5, // percent
            hideIn: 8000, // milliseconds
            type: CGBand,
            getData: (player) => {
                return player.getVideoData().title;
            }
        }, {
            showAt: 50, // percent
            hideIn: 8000, // milliseconds
            type: CGBand,
            getData: (player) => {
                return player.getVideoData().title;
            }
        }, {
            showAt: 95, // percent
            hideIn: 8000, // milliseconds
            type: CGBand,
            getData: (player) => {
                return player.getVideoData().title;
            }
        }];

        this.state = {
            loading: true,
            error: false,
            playlist: videos.keys(),
            showCGBand: false,
            currentVideoTitle: ''
        };
    }

    componentDidMount() {
        this._attachCloseWarning();
    }

    componentWillUnmount() {
        for (let TId of this._onScreenTimeoutIds) {
            clearTimeout(TId);
        }
    }

    render() {
        let content = null;
        content = this.state.loading ? this._getLoadingRender() : content;
        content = this.state.error ? this._getErrorRender() : content;
        content = !this.state.loading && !this.state.error ? this._getYoutubeVideoRender() : content;
        return (content);
    }

    _collectVideosId() {
        let hasTitlesToSearch = !!externalList.length;
        let nextAction = hasTitlesToSearch ? this._searchMoreTitles.bind(this) : this._allTitlesSearched.bind(this);
        nextAction();
    }

    _allTitlesSearched() {
        let hasFoundVideos = videos.size > 0;
        if (hasFoundVideos) {
            // inject playlist into player for lazy loading
            this._lazyLoad(Array.from(videos.keys()));
        } else {
            this._failedFindingVideos();
        }
    }

    _searchMoreTitles() {
        let videoTitle = externalList.shift();
        let config = { order: 'viewCount' };
        Video.where(videoTitle, config)
        .then(page=> {

            let hasFoundVideos = page.elements.length;
            if (hasFoundVideos) {
                let element = page.firstElement();
                // improve selection intelligence here iterating page.elements
                videos.set(element.id, element);
            }

            let isFirstVideo = videos.size === 1;
            if (isFirstVideo) {
                // start with first collected video. Others are lazy loaded.
                let firstId = Array.from(videos.keys())[0];
                this.setState({
                    loading: false,
                    error: false,
                    playlist: [firstId],
                    showCGBand: false,
                    currentVideoTitle: videos.get(firstId).title
                });
                // needed to handle NEXT event on iPhone
                this._currentVideoIndex = 0;
            }
            // updates every loop for UI actions before full list loaded
            // in case user click NEXT before all titles are searched.
            this._lazyLoad(Array.from(videos.keys()));
            this._collectVideosId();
        });
    }

    _getLoadingRender() {
        return (
            <div className="AppLoading"></div>
        );
    }

    _getErrorRender() {
        return (
            <a className="AppFail" href="#" onClick={this.close}>
                <div className="copy">
                    <span className="line1">Sorry, we've run out of videos for your search.</span>
                    <span className="line2">Try again with more devotion</span>
                </div>
            </a>
        );
    }

    _getYoutubeVideoRender() {
        let onScreenComp = IS_IPHONE
            ? this._getIphonePlayerConponents()
            : this._getPlayerComponents();
        return onScreenComp;
    }

    _getIphonePlayerConponents() {
        return (
            <div>
                <Player className="playerContainer"
                    list={this.state.playlist}
                    onReady={this._onReadyHandler}
                    onEnd={this._onEndHandler}
                />
                <IphoneControls
                    onSkip={this._onIphoneCPSkipHandler}
                    onClose={this._onCPCloseHandler}
                />
            </div>
        );
    }

    _getPlayerComponents() {
        return (
            <div>
                <Player className="playerContainer"
                    list={this.state.playlist}
                    onReady={this._onReadyHandler}
                    onEnd={this._onEndHandler}
                    onPause={this._onPauseHandler}
                    onPlay={this._onPlayHandler}
                    onStateChange={this._onStateChangeHandler}
                />
                <CGBand ref="CGBand" />
                <PlayerControls
                    onReady={this._onCPReady}
                    onPlayPause={this._onCPPlayPauseHandler}
                    onForward={this._onCPForwardHandler}
                    onRewind={this._onCPRewindHandler}
                    onSkip={this._onCPSkipHandler}
                    onClose={this._onCPCloseHandler}
                />
            </div>
        );
    }

    _onCloseHandler(evt) {
        evt.preventDefault();
        this.close();
    }

    _onReadyHandler(evt) {
        this._player = evt.target;
        if (!IS_IPHONE) {
            // onStateChange prop on Player doesn't work.
            this._player.addEventListener('onStateChange', this._onStateChangeHandler.bind(this));
        }
    }

    _onEndHandler() {
        if (IS_IPHONE) {
            this._iPhoneOnEndHandler();
        } else {
            this._regularOnEndHandler();
        }
    }

    _onIphoneCPSkipHandler() {
        this._iPhoneNextVideo();
    }

    _iPhoneOnEndHandler() {
        this._iPhoneNextVideo();
    }

    _iPhoneNextVideo() {
        // has next?
        if (this._currentVideoIndex + 1 === this._lazyList.length) {
            // first
            this._currentVideoIndex = 0;
        } else {
            // next
            this._currentVideoIndex++;
        }

        let videoId = this._lazyList[this._currentVideoIndex];
        // update state
        this.setState({
            loading: false,
            error: false,
            playlist: [videoId],
            showCGBand: false,
            currentVideoTitle: videos.get(videoId).title
        });
    }

    _regularOnEndHandler() {
        if (this._isLazy) {
            this._isLazy = false;
            this._player.loadPlaylist(this._lazyList, 1);
            this._player.setLoop(true);
        }
        this._resetOnScreenTimers();
    }

    _onPauseHandler() {
        this.refs.CGBand.show(this._player.getVideoData().title);
        this._resetOnScreenTimers();
    }

    _onPlayHandler() {
        const theCGBand = this.refs.CGBand;
        const hasTimeouts = !!this._onScreenTimeoutIds.length;
        const duration = this._player.getDuration();
        const startedVideo = !!duration;

        if (!hasTimeouts && startedVideo) {
            // starting video
            const videoData = this._player.getVideoData();
            const currentTime = this._player.getCurrentTime();
            /* eslint-disable no-undef*/
            ga('send', 'event', 'video', 'play', `${videoData.video_id}-${videoData.title}`);
            /* eslint-enable no-undef*/

            let visualsToDisplay = this._visualsOnScreen.filter((config) => {
                let timeout = config.showAt * duration / 100;
                return timeout >= currentTime;
            });

            let setTimer = (playerData, msToShow, msToHide)=> {
                this._onScreenTimeoutIds.push(
                    setTimeout(() => {
                        theCGBand.show(playerData, msToHide);
                    }, msToShow * 1000)
                );
            };
            setTimer = setTimer.bind(this);

            visualsToDisplay.forEach((config)=> {
                let msToShow = (config.showAt * duration / 100) - currentTime;
                setTimer(config.getData(this._player), msToShow, config.hideIn);
            });
        }
        theCGBand.hide();
    }

    _onStateChangeHandler() {
        let status = this._player.getPlayerState();
        this._playerControls.setStatus(status);
    }

    _onCPReady(panel) {
        this._playerControls = panel;
    }

    _onCPPlayPauseHandler() {
        let status = this._player.getPlayerState();
        if (status === 1) {
            this._player.pauseVideo();
        } else {
            this._player.playVideo();
        }
    }

    _onCPCloseHandler() {
        this.close();
    }

    _onCPForwardHandler() {
        let curTime = this._player.getCurrentTime();
        let newTime = curTime + 10;
        this._player.seekTo(newTime, true);
    }

    _onCPRewindHandler() {
        let curTime = this._player.getCurrentTime();
        let newTime = curTime > 10 ? curTime - 10 : 0;
        this._player.seekTo(newTime);
    }

    _onCPSkipHandler() {
        let videoData = this._player.getVideoData();
        /* eslint-disable no-undef*/
        ga('send', 'event', 'video', 'skip', `${videoData.video_id}-${videoData.title}`);
        /* eslint-enable no-undef*/
        if (this._isLazy) {
            this._onEndHandler();
        } else {
            this._player.nextVideo();
        }
        this._resetOnScreenTimers();
    }

    _resetOnScreenTimers() {
        this._onScreenTimeoutIds.forEach(Tid=> clearTimeout(Tid));
        this._onScreenTimeoutIds = [];
    }

    _lazyLoad(list) {
        this._lazyList = list;
        this._isLazy = true;
    }

    _failedFindingVideos() {
        this.setState(Object.assign(
            this.state,
            { error: true, loading: false }
        ));
    }

    _attachCloseWarning() {
        window.onbeforeunload = (event)=> {
            const message = 'Sure you want to close?';
            if (typeof event === 'undefined') {
                event = window.event;
            }

            if (event) {
                event.returnValue = message;
            }
            return message;
        };
    }

    _removeCloseWarning() {
        window.onbeforeunload = ()=> null;
    }

    close() {
        this._removeCloseWarning();
        this.props.onClose();
    }


}

PlayerManager.defaultProps = {
    onClose: ()=> {}
};

export default PlayerManager;
