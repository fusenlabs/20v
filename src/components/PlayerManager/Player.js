'use strict';
import React, { Component } from 'react';// eslint-disable-line no-unused-vars
import Youtube from 'react-youtube';// eslint-disable-line no-unused-vars
import { IS_IPHONE } from './../../constants/app';

class Player extends Component {

    render() {
        let { list, ...other } = this.props;
        let firstVideoId = list.shift();
        let playerVars = {
            controls: 0, // show/hide controls
            autohide: 2, // controls autohide
            disablekb: 0, //  allow keyboard control
            fs: 0, // hide fullscreen button
            iv_load_policy: 3, // disable anotations
            loop: 1,
            rel: 0,
            showinfo: 0,
            modestbranding: 1 // remove watermark/logo
        };

        if (!IS_IPHONE) {
            playerVars.autoplay = 1;
            playerVars.playlist = list.join(',');
        }

        let opts = {
            height: '100%',
            width: '100%',
            playerVars
        };
        return (
            <Youtube
                url={`https://www.youtube.com/watch?v=${firstVideoId}`}
                opts={opts}
                {...other}
            />
        );
    }
}

export default Player;
