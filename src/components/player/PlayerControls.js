import React, {Component} from 'react';

class PlayerControls extends Component {
    constructor(props) {
        super(props);
        this.state = { show: false, status: 1 };
        this.timeoutId;
    }

    componentDidMount() {
        this.props.onReady(this);
    }

    render() {
        let showClass = this.state.show ? 'in' : '';
        return (
            <div className={'PlayerControls custom-player-controls-wrapper' + showClass}
                onMouseMove={this._handleMouseMove.bind(this)}>

                <div className='video-close'>
                    <a href='#' onClick={this._handleClose.bind(this)}>
                        &times;
                    </a>
                </div>

                <div className='video-next'>
                    <a href='#'  onClick={this._handleSkip.bind(this)}>
                        NEXT VIDEO <i className='fa fa-step-forward'></i>
                    </a>
                </div>

                <div className='video-playback-controls'>
                    <div className='video-play-pause'>
                        <a href='#' onClick={this._handlePlayPause.bind(this)}>
                            { this.state.status == 1 ?
                                <i className='fa fa-pause'></i> :
                                <i className='fa fa-play'></i>
                            }
                        </a>
                    </div>

                    <div className='video-backward'>
                        <a href='#' onClick={this._handleRewind10.bind(this)}>
                            <i className='fa fa-backward'></i>
                        </a>
                    </div>

                    <div className='video-forward'>
                        <a href='#' onClick={this._handleForward10.bind(this)}>
                            <i className='fa fa-forward'></i>
                        </a>
                    </div>
                </div>

                <div className='upper-options-panel'>
                    <div className='video-title'>{this.props.videoTitle}</div>
                    <div className='show-list-trigger'></div>
                </div>
            </div>
        );
    }

    _handleRewind10(event) {
        event.preventDefault();
        this.props.onRewind(this);
        ga('send', 'event', 'click', 'player', 'rewind10');
    }

    _handlePlayPause(event) {
        event.preventDefault();
        this.props.onPlayPause(this);
        ga('send', 'event', 'click', 'player', 'play/pause');
    }

    _handleForward10(event) {
        event.preventDefault();
        this.props.onForward(this);
        ga('send', 'event', 'click', 'player', 'forward10');
    }

    _handleSkip(event) {
        event.preventDefault();
        this.props.onSkip(this);
        ga('send', 'event', 'click', 'player', 'skip');
    }

    _handleClose(event) {
        event.preventDefault();
        this.props.onClose(this);
        ga('send', 'event', 'click', 'player', 'close');
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
        this.setState(Object.assign(this.state, { status: statusCode}));
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

export default PlayerControls;
