'use strict';
import React, {Component} from 'react';

class Share extends Component {
    render() {
        return (<div className='share-wrapper'>
                    <span>Share</span>
                    {this._tw()}
                    {this._fb()}
                </div>
            );
    }

    _fb() {
        let url = `http://facebook.com/sharer.php?s=100&p[url]=http://www.20v.co`;
        let share = this._share.bind(this, url);
        return (<a href='#' onClick={share}>
                    <img src='facebook.svg'/>
                </a>);
    }

    _tw() {
        let url = `https://twitter.com/intent/tweet?text=text&url=http://www.20v.co&hashtags=music`;
        let share = this._share.bind(this, url);
        return (<a href='#' onClick={share}>
                    <img src='twitter.svg'/>
                </a>);
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
