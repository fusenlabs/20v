'use strict';
import React, {Component} from 'react';
import Player from './Player';
import CGBand from './CGBand';
import PlayerControls from './PlayerControls';
import {Config,Video} from 'youtube-client-wrapper';

let bootYoutubeClient = () => {
    return Config.set({
                apiKey: 'AIzaSyB8_0tIV6QuSA5Qb1zx3kXW8UAB-cATQXU'
            })
            .boot();
};

let videos = new Map();
let externalList = [];
class PlayerManager extends Component {
    constructor(...props) {
        super(...props);
        //boot first, then start to process
        bootYoutubeClient()
            .then(() => {
                this._collectVideosId();
            });

        //initialization
        this._player = null;
        this._lazyList = [];
        this._isLazy = false;
        this._currentVideoOnPlayer;
        this._onScreenTimeoutIds = [];
        //custom youtube player controls
        this._playerControls = null;

        //note: when we implement resuming playing, we must
        //preserve videos map.
        //by now clear it to renew the videos map with externalPlaylist
        videos = new Map();
        externalList = this.props.playlist;

        //on-screen info configuration
        this._visualsOnScreen = [{
            showAt: 5,//percent
            hideIn: 8000,//milliseconds
            type: CGBand,
            getData: (player) => {
                return player.getVideoData().title;
            }
        },{
            showAt: 50,//percent
            hideIn: 8000,//milliseconds
            type: CGBand,
            getData: (player) => {
                return player.getVideoData().title;
            }
        },{
            showAt: 95,//percent
            hideIn: 8000,//milliseconds
            type: CGBand,
            getData: (player) => {
                return player.getVideoData().title;
            }
        }];

        this.state = {
            loading: true,
            playlist: videos.keys(),
            showCGBand: false,
            currentVideoTitle: ''
        };
    }

    componentWillUnmount() {
        for (let TId of this._onScreenTimeoutIds) {
            clearTimeout(TId);
        }
    }

    render() {
        let content = this.state.loading ? this._getLoadingComponent() : this._getYoutubeVideo();
        return (content);
    }

    _collectVideosId() {
        if (externalList.length == 0) {
            //inject playlist into player
            this._lazyLoad(Array.from(videos.keys()));
        } else {
            let videoTitle = externalList.shift();
            let config = { order: 'viewCount'};
            Video.where(videoTitle, config)
            .then(page => {
                if (page.elements.length > 0) {
                    let element = page.firstElement();
                    /*for (let song of page.elements) {
                        // improve selection intelligence here
                    }*/
                    videos.set(element.id, element);
                }
                if (videos.size == 1) {
                    //start with first collected video
                    let firstId = Array.from(videos.keys())[0];
                    this.setState({
                        loading: false,
                        playlist: [firstId],
                        showCGBand: false,
                        currentVideoTitle: videos.get(firstId).title
                    });
                }
                this._collectVideosId();
            });
        }
    }

    _getLoadingComponent() {
        return (
            <div className='AppLoading'><h1>loading...</h1></div>
        );
    }

    _getYoutubeVideo() {
        return (
            <div>
                <Player className='playerContainer'
                    list={this.state.playlist}
                    onReady={this._onReadyHandler.bind(this)}
                    onEnd={this._onEndHandler.bind(this)}
                    onPause={this._onPauseHandler.bind(this)}
                    onPlay={this._onPlayHandler.bind(this)}
                    onStateChange={this._onStateChangeHandler.bind(this)} />
                <CGBand ref='CGBand' />
                <PlayerControls
                    onReady={this._onCPReady.bind(this)}
                    onPlayPause={this._onCPPlayPauseHandler.bind(this)}
                    onForward={this._onCPForwardHandler.bind(this)}
                    onRewind={this._onCPRewindHandler.bind(this)}
                    onSkip={this._onCPSkipHandler.bind(this)}
                    onClose={this._onCPCloseHandler.bind(this)}
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
        //onStateChange prop on Player doesn't work.
        this._player.addEventListener('onStateChange', this._onStateChangeHandler.bind(this));
    }

    _onEndHandler(evt) {

        if (this._isLazy) {
            this._isLazy = false;
            this._player.loadPlaylist(this._lazyList, 1);
            this._player.setLoop(true);
        }
        this._resetOnScreenTimers();
    }

    _onPauseHandler(evt) {
        this.refs.CGBand.show(this._player.getVideoData().title);
        //this.refs.CloseBtn.style.display = 'block';

        this._resetOnScreenTimers();
    }

    _onPlayHandler(evt) {
        let CGBand = this.refs.CGBand;
        let duration = this._player.getDuration();
        let currentTime = this._player.getCurrentTime();
        let timeout;

        if (this._onScreenTimeoutIds.length == 0 && duration != 0) {
            //starting video
            let visualsToShow = this._visualsOnScreen.filter((config) => {
                timeout = config.showAt * duration / 100;
                return timeout >= currentTime;
            });
            for (let config of visualsToShow) {
                timeout = (config.showAt * duration / 100) - currentTime;
                ((config, player) => {
                    this._onScreenTimeoutIds.push(
                        setTimeout(() => {
                            CGBand.show(config.getData(player), config.hideIn);
                        }, timeout * 1000)
                    );
                })(config, this._player);
            }
        }
        CGBand.hide();
    }

    _onStateChangeHandler(evt) {
        let status = this._player.getPlayerState();
        this._playerControls.setStatus(status);
    }

    _onCPReady(panel) {
        this._playerControls = panel;
    }

    _onCPPlayPauseHandler(panel) {
        let status = this._player.getPlayerState();
        if (status == 1) {
            this._player.pauseVideo();
        } else {
            this._player.playVideo();
        }
    }

    _onCPCloseHandler(panel) {
        this.close();
    }

    _onCPForwardHandler(panel) {
        let curTime = this._player.getCurrentTime();
        let newTime = curTime + 10;
        this._player.seekTo(newTime, true);
    }

    _onCPRewindHandler(panel) {
        let curTime = this._player.getCurrentTime();
        let newTime = curTime > 10 ? curTime - 10 : 0;
        this._player.seekTo(newTime);
    }

    _onCPSkipHandler(panel) {
        if (this._isLazy) {
            this._onEndHandler();
        } else {
            this._player.nextVideo();
        }
        this._resetOnScreenTimers();
    }

    _resetOnScreenTimers() {
        for (let TId of this._onScreenTimeoutIds) {
            clearTimeout(TId);
        }
        this._onScreenTimeoutIds = [];
    }

    _lazyLoad(list) {
        this._lazyList = list;
        this._isLazy = true;
    }

    close() {
        this.props.onClose();
    }

}

PlayerManager.defaultProps = {
    onClose: () => {}
};

export default PlayerManager;
