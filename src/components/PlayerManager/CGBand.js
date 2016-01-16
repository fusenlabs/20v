'use strict';
import React, { Component } from 'react';// eslint-disable-line no-unused-vars

let DEFAULT_ARTIST_NAME = 'Now Playing';

class CGBand extends Component {
    constructor(...props) {
        super(...props);
        this._timeoutId = null;
        this.state = {
            show: false,
            videoTitle: null
        };
    }

    componentWillUnmount() {
        clearTimeout(this._timeoutId);
    }

    render() {
        let CGClass = 'CGBand skew' + (this.state.show ? ' in' : '');
        let videoTitle = this.state.videoTitle || this.props.videoTitle || '';
        let BGRandomGradient = 'background gradient-' + (Math.round(Math.random() * 4) + 1);
        let videoDescription = videoTitle.split(' - ');
        let artistName = videoDescription[0] ? videoDescription[0] : DEFAULT_ARTIST_NAME;
        let songTitle = videoDescription[1] ? videoDescription[1] : videoTitle;
        return (
            <div className={CGClass}>
                <div className={BGRandomGradient}></div>
                <div className="content-wrapper">
                    <div className="upper-row">
                    <h1>{artistName}</h1>
                </div>
                    <div className="bottom-row">
                        <h2>{songTitle}</h2>
                    </div>
                </div>
            </div>
        );
    }

    show(title, hideTimeout = 999999999) {
        this.setState({ show: true, videoTitle: title || this.state.videoTitle });
        this._timeoutId = setTimeout(() => {
            this.setState({ show: false });
        }, hideTimeout);
    }

    hide() {
        this.setState({ show: false });
        clearTimeout(this._timeoutId);
    }
}

export default CGBand;
