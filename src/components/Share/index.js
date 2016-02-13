'use strict';
import React, { Component } from 'react';// eslint-disable-line no-unused-vars

class Share extends Component {
    constructor() {
        super();
        this._shareFB = this._shareFB.bind(this);
        this._shareTW = this._shareTW.bind(this);
    }

    render() {
        return (<div className="share-wrapper">
                    <span>Share</span>
                    {this._tw()}
                    {this._fb()}
                </div>
            );
    }

    _fb() {
        return (<a href="#" onClick={this._shareFB}>
                    <img src="/images/facebook.svg"/>
                </a>);
    }

    _tw() {
        return (<a href="#" onClick={this._shareTW}>
                    <img src="/images/twitter.svg"/>
                </a>);
    }

    _shareFB() {
        let url = `http://facebook.com/sharer.php?s=100&p[url]=http://www.20v.co`;
        this._share(url);
    }

    _shareTW() {
        let url = `https://twitter.com/intent/tweet?text=Check out this new app to create video playlists with just one click. Discover 20v, music for your eyes here!&url=http://www.20v.co`;
        this._share(url);
    }

    _share(url) {
        open(
          url,
          'Share',
          'height=380,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0'
          );
    }
}

export default Share;
