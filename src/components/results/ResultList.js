'use strict';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as searchActions from './../../actions/search';

class ResultList extends Component {
    render() {
        return (
            <div className={'results-list' + (this.props.isSearching ? 'search-mask' : '') }>
                <div className="main-result">
                	<div className="track-number">1</div>
                	<div className="track-play-icon">
                    	<svg x="0px" y="0px" width="40px" height="40px" viewBox="0 0 40 40">
                    		<path fill="#FFFFFF" d="M14,16.799l5-5v15v1l-5-5H9v-6H14z M25,19.799c0-2.049-1.236-3.806-3-4.578v9.155 C23.764,23.605,25,21.848,25,19.799z M22,10v2.062c3.449,0.889,6,4.011,6,7.738s-2.551,6.849-6,7.738v2.062 c4.564-0.927,8-4.961,8-9.799S26.564,10.927,22,10z"/>
                    	</svg>
                	</div>
                	<p className="track-name">First Result Song</p>
                	<p className="track-artist">First Result Artist</p>
                </div>

                <button className="playlist-trigger">
                    Start TV Channel
                </button>

                <ul>
                    {this.props.resultList.map(track => {
                        return (
                            <li key={track.id} className="single-track">
                            	<div className="track-number">20</div>
                            	<div className="track-play-icon">
	                            	<svg x="0px" y="0px" width="40px" height="40px" viewBox="0 0 40 40">
	                            		<path fill="#FFFFFF" d="M14,16.799l5-5v15v1l-5-5H9v-6H14z M25,19.799c0-2.049-1.236-3.806-3-4.578v9.155 C23.764,23.605,25,21.848,25,19.799z M22,10v2.062c3.449,0.889,6,4.011,6,7.738s-2.551,6.849-6,7.738v2.062 c4.564-0.927,8-4.961,8-9.799S26.564,10.927,22,10z"/>
	                            	</svg>
                            	</div>
                            	<p className="track-name">{track.name}</p>
                            	<p className="track-artist">{track.artists[0].name}</p>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {search} = state;
    return {
        resultList: search.resultList,
        isSearching: search.isSearching
    };
}

export default connect(
    mapStateToProps,
    {
    }
)(ResultList);
