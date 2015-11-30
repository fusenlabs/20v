'use strict'
import React, {Component} from 'react';
import Player from './Player';
import CGBand from './CGBand';
import {Config,Video} from 'youtube-client-wrapper';

let bootYoutubeClient = ()=>{
    return Config.set({
                apiKey: 'AIzaSyB8_0tIV6QuSA5Qb1zx3kXW8UAB-cATQXU'
            })
            .boot();
}

let currentPlayListIds = [];
let videos = new Map();
let externalList = [];
class PlayerManager extends Component {
    constructor(...props){
        super(...props);
        //boot first, then start to process
        bootYoutubeClient()
            .then(() => {
                this._collectVideosId();
            });

        //initialization
        this._currentVideoOnPlayer;
        this._onScreenTimeoutIds = [];

        //console.log(this.props.playlist[0]);
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
            playlist: currentPlayListIds,
            showCGBand: false,
            currentVideoTitle: ''
        };
    }

    render() {
        let content = this.state.loading? this._getLoadingComponent() : this._getYoutubeVideo();
        return ( content );
    }

    _collectVideosId() {
        if( externalList.length == 0 ){
            this.setState({
                loading: false,
                playlist: currentPlayListIds,
                showCGBand: false,
                currentVideoTitle: videos.get(currentPlayListIds[0]).title
            });
        }else{
            let videoTitle = externalList.shift();
            Video.where(videoTitle)
            .then(page => {
                if( page.elements.length > 0 ){
                    currentPlayListIds.push( page.firstElement().id );
                    videos.set( page.firstElement().id, page.firstElement());
                }
                this._collectVideosId();
            });
        }
    }

    _getLoadingComponent() {
        return (
            <div className="AppLoading"><h1>loading...</h1></div>
        );
    }

    _getYoutubeVideo() {
        return (
            <div>
                <a href="#" className="closePlayer" onClick={this._onCloseHandler.bind(this)} ref="CloseBtn">X</a>
                <Player className="playerContainer" 
                    list={this.state.playlist}
                    onReady={this._onReadyHandler.bind(this)}
                    onEnd={this._onEndHandler.bind(this)} 
                    onPause={this._onPauseHandler.bind(this)}
                    onPlay={this._onPlayHandler.bind(this)}
                    onStateChange={this._onStateChangeHandler.bind(this)} />
                <CGBand ref="CGBand" />
            </div>

        );
    }

    _onCloseHandler(evt) {
        evt.preventDefault();
        this.props.onClose();
    }

    _onReadyHandler( evt ) {
        //console.log(evt);
    }

    _onEndHandler( evt ) {
        //console.log('END');
        this._resetOnScreenTimers();
    }

    _onPauseHandler( evt ) {
        //console.log('SHOW FOOTER ON PAUSE');
        this.refs.CGBand.show( evt.target.getVideoData().title );
        this.refs.CloseBtn.style.display = 'block';

        this._resetOnScreenTimers();
    }

    _onPlayHandler( evt ) {
        let CGBand = this.refs.CGBand;
        let CloseBtn = this.refs.CloseBtn;

        if( this._onScreenTimeoutIds.length == 0 ){
            //starting video
            this._currentVideoOnPlayer = evt.target;
            let duration = this._currentVideoOnPlayer.getDuration(),
            currentTime = evt.target.getCurrentTime(),
            timeout;

            let visualsToShow = this._visualsOnScreen.filter((config) => { 
                timeout = config.showAt * duration / 100;
                return timeout >= currentTime;
            });
            //console.log(visualsToShow);
            for( let config of visualsToShow ){
                timeout = (config.showAt * duration / 100) - currentTime;
                (( config, player ) => {
                    this._onScreenTimeoutIds.push(
                        setTimeout(()=>{
                            CGBand.show( config.getData(player), config.hideIn );
                        }, timeout * 1000 )
                    );
                })( config, evt.target );
            }
        }
            
        //console.log('HIDE FOOTER ON RESUME');
        CGBand.hide();
        CloseBtn.style.display = 'none';
    }

    _onStateChangeHandler( evt ) {
        //console.log('STATE CHANGE');
        //console.log(evt);
    }

    _resetOnScreenTimers() {
        for( let TId of this._onScreenTimeoutIds ){
            clearTimeout( TId );
        }
        this._onScreenTimeoutIds = [];
    }

}

PlayerManager.defaultProps = {
    onClose: () => {}
}

export default PlayerManager;