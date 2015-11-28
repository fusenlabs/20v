'use strict'
import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as AppActions from './actions/applicationActions';

class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        console.log(this.props);
    }

    render() {
        return ( <div>Hello Redux World. Stage: {this.props.stage}<br/>
            <button onClick={this._changeStage.bind(this)}>change stage to GALLERY</button><br/>
            <button onClick={this._changeDeferedStage.bind(this)}>change async stage to ASYNC</button>
        </div> );
    }

    _changeStage( evt ) {
        evt.preventDefault();
        this.props.setStage('GALLERY');
    }

    _changeDeferedStage( evt ) {
        evt.preventDefault();
        this.props.setDeferedStage('ASYNC');
    }
}

function mapStateToProps(state) {
    const { application } = state;
    return {
        stage: application.stage
    };
}

export default connect(
    mapStateToProps,
    {
        setStage: AppActions.setApplicationStage,
        setDeferedStage: AppActions.setAsyncApplicationStage
    }
)(App);