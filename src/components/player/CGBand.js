'use strict'
import React, {Component} from 'react';

class CGBand extends Component {
    constructor(...props){
        super(...props);
        this._timeoutId;
        this.state = {
            show: false,
            videoTitle: null
        }
    }

    render() {
        let CGClass = 'CGBand skew' + (this.state.show? ' in':'');
        let videoTitle = this.state.videoTitle || this.props.videoTitle;
        let BGRandomGradient = "background gradient-" + (Math.round(Math.random()*4)+1);
        
        return (
            <div className={CGClass}>
            	<div className={BGRandomGradient}></div>
	            <div className="content-wrapper">
	            	<div className="upper-row">
		            	<h1>Now playing</h1>
		            </div>
	            	<div className="bottom-row">
			            <h2>{videoTitle}</h2>
			        </div> 
	            </div>
            </div>
        );
    }

    show( title, hideTimeout = 999999999 ) {
        this.setState({ show: true, videoTitle: title || this.state.videoTitle });
        this._timeoutId = setTimeout(()=>{
            this.setState({ show: false });
        },hideTimeout);
    }

    hide() {
        this.setState({ show: false });
        clearTimeout(this._timeoutId);
    }
}

export default CGBand;