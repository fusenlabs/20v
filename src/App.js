import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as searchActions from './actions/search';

class App extends Component {
    
    constructor(props) {
        super(props);
    }
    
    render() {
        return <div>
            <input type="text" onKeyPress={this._handleKeyPress.bind(this)}/>
            <span>{this.props.text}</span>
        </div>;
    }

    _handleKeyPress(event) {
        if (event.key === 'Enter') {
            this.props.setSearch('new search')
        }
    }
}

function mapStateToProps(state) {
    const {search} = state;
    return {
        text: search.text
    };
}

export default connect(
    mapStateToProps,
    {
        setSearch: searchActions.setSearch
    }
)(App);