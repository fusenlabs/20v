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
        return ( <div>Hello Redux World. Stage: {this.props.stage}</div> );
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
        setStage: AppActions.setApplicationStage
    }
)(App);