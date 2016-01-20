import React, { Component } from 'react';// eslint-disable-line no-unused-vars

class PlayerControls extends Component {
    constructor(props) {
        super(props);
        this._handleMouseMove = this._handleMouseMove.bind(this);
        this._handleClose = this._handleClose.bind(this);
        this._handleSkip = this._handleSkip.bind(this);
        this._handlePlayPause = this._handlePlayPause.bind(this);
        this._handleRewind10 = this._handleRewind10.bind(this);
        this._handleForward10 = this._handleForward10.bind(this);
        this.state = { show: false, status: 1 };
        this.timeoutId = null;
    }

    componentDidMount() {
        this.props.onReady(this);
    }

    componentWillUnmount() {
        clearTimeout(this.timeoutId);
    }

    render() {
        let showClass = this.state.show ? 'in' : '';
        return (
            <div className={'PlayerControls custom-player-controls-wrapper' + showClass}
                onMouseMove={this._handleMouseMove}
            >

                <div className="video-close">
                    <a href="#" onClick={this._handleClose}>
                        &times;
                    </a>
                </div>

                <div className="video-next">
                    <a href="#" onClick={this._handleSkip}>
                        NEXT VIDEO <i className="fa fa-step-forward"></i>
                    </a>
                </div>

                <div className="video-playback-controls">
                    <div className="video-play-pause">
                        <a href="#" onClick={this._handlePlayPause}>
                            { this.state.status === 1 ?
                                <i className="fa fa-pause"></i> :
                                <i className="fa fa-play"></i>
                            }
                        </a>
                    </div>

                    <div className="video-backward">
                        <a href="#" onClick={this._handleRewind10}>
                            <i className="fa fa-backward"></i>
                        </a>
                    </div>

                    <div className="video-forward">
                        <a href="#" onClick={this._handleForward10}>
                            <i className="fa fa-forward"></i>
                        </a>
                    </div>
                </div>

                <div className="upper-options-panel">
                    <div className="video-title">{this.props.videoTitle}</div>
                    <div className="show-list-trigger"></div>
                </div>
            </div>
        );
    }

    _handleRewind10(event) {
        event.preventDefault();
        this.props.onRewind(this);
        ga('send', 'event', 'click', 'player', 'rewind10');// eslint-disable-line no-undef
    }

    _handlePlayPause(event) {
        event.preventDefault();
        this.props.onPlayPause(this);
        ga('send', 'event', 'click', 'player', 'play/pause');// eslint-disable-line no-undef
    }

    _handleForward10(event) {
        event.preventDefault();
        this.props.onForward(this);
        ga('send', 'event', 'click', 'player', 'forward10');// eslint-disable-line no-undef
    }

    _handleSkip(event) {
        event.preventDefault();
        this.props.onSkip(this);
        ga('send', 'event', 'click', 'player', 'skip');// eslint-disable-line no-undef
    }

    _handleClose(event) {
        event.preventDefault();
        this.props.onClose(this);
        ga('send', 'event', 'click', 'player', 'close');// eslint-disable-line no-undef
    }

    _handleMouseMove(event) {
        event.preventDefault();
        if (!this.state.show) {
            this.setState(Object.assign(this.state, { show: true }));
        } else {
            clearTimeout(this.timeoutId);
        }
        this.timeoutId = setTimeout(()=> {
            this.setState(Object.assign(this.state, { show: false }));
        }, 2500);
    }

    setStatus(statusCode) {
        this.setState(Object.assign(this.state, { status: statusCode }));
    }
}

PlayerControls.defaultProps = {
    videoTitle: '',
    onReady: ()=> {},
    onPlayPause: ()=> {},
    onRewind: ()=> {},
    onForward: ()=> {},
    onSkip: ()=> {},
    onClose: ()=> {}
};

class IphoneControls extends Component {
    constructor(props) {
        super(props);
        this._handleClose = this._handleClose.bind(this);
        this._handleSkip = this._handleSkip.bind(this);
    }

    render() {
        return (
            <div className="PlayerControls-iphone">
                <div className="video-close">
                    <a href="#" onClick={this._handleClose}>
                        &times;
                    </a>
                </div>

                <div className="video-next">
                    <a href="#" onClick={this._handleSkip}>
                        NEXT VIDEO <i className="fa fa-step-forward"></i>
                    </a>
                </div>

                <div className="iphone-disclaimer">
                    For a better experience, use 20v.co in a wide-screen device
                </div>
            </div>
        );
    }

    _handleSkip(event) {
        event.preventDefault();
        this.props.onSkip(this);
        ga('send', 'event', 'click', 'player', 'skip');// eslint-disable-line no-undef
    }

    _handleClose(event) {
        event.preventDefault();
        this.props.onClose(this);
        ga('send', 'event', 'click', 'player', 'close');// eslint-disable-line no-undef
    }
}

IphoneControls.defaultProps = {
    onSkip: ()=> {},
    onClose: ()=> {}
};

export { PlayerControls as default, IphoneControls };
