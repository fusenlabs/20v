import React, {Component} from 'react';

class PlayerControls extends Component {
    constructor(props) {
        super(props);
        this.state = { show: false, status: 2 };
        this.timeoutId;
    }

    render() {
        let showClass = this.state.show ? 'in' : '';
        return (
            <div className={'PlayerControls custom-player-controls-wrapper' + showClass}
                onMouseMove={this._handleMouseMove.bind(this)}>
                <div className='upper-options-panel'>
                    <div className='video-title'>{this.props.videoTitle}</div>
                    <div className='show-list-trigger'></div>
                    <div className='upper-right-trigger'>
                        <a href='#' onClick={this._handleClose.bind(this)}>
                            <i className='fa fa-times-circle-o'></i>
                        </a>
                    </div>
                    <div className='upper-right-trigger'>
                        <a href='#'  onClick={this._handleSkip.bind(this)}>
                            <i className='fa fa-share'></i>
                        </a>
                    </div>
                </div>
                <div className='lower-options-panel'>
                    <ul>
                        <li className='left'>
                            <a href='#' onClick={this._handleRewind10.bind(this)}>
                                <i className='fa fa-undo'></i>
                            </a>
                        </li>
                        <li className='middle'>
                            <a href='#' onClick={this._handlePlayPause.bind(this)}>
                                { this.state.status == 1 ?
                                    <i className='fa fa-play-circle-o'></i> :
                                    <i className='fa fa-pause-circle-o'></i>
                                }
                            </a>
                        </li>
                        <li className='right'>
                            <a href='#' onClick={this._handleForward10.bind(this)}>
                                <i className='fa fa-undo fa-flip-horizontal'></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }

    _handleRewind10(event) {
        event.preventDefault();
        this.props.onRewind(this);
    }

    _handlePlayPause(event) {
        event.preventDefault();
        this.props.onPlayPause(this);
    }

    _handleForward10(event) {
        event.preventDefault();
        this.props.onForward(this);
    }

    _handleSkip(event) {
        event.preventDefault();
        this.props.onSkip(this);
    }

    _handleClose(event) {
        event.preventDefault();
        this.props.onClose(this);
    }

    _handleMouseMove(event) {
        event.preventDefault();
        if (this.state.show) {
            clearTimeout(this.timeoutId);
        }
        this.setState(Object.assign(this.state, { show: true }));
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
    onClose: ()=> {},
    onPlayPause: ()=> {},
    onRewind: ()=> {},
    onForward: ()=> {},
    onSkip: ()=> {}
};

export default PlayerControls;
