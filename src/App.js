import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as searchActions from './actions/search';

class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div>
            <input type='text' ref='searchBox' onKeyPress={this._handleKeyPress.bind(this)}/>
            <span>{this.props.searchText}</span>
            <span>{this.props.resultList.length}</span>
        </div>;
    }

    _handleKeyPress(event) {
        if (event.key === 'Enter') {
            this.props.fetchSearch(this.refs.searchBox.value);
        }
    }
}

function mapStateToProps(state) {
    const {search} = state;
    return {
        searchText: search.searchText,
        resultList: search.resultList
    };
}

export default connect(
    mapStateToProps,
    {
        fetchSearch: searchActions.fetchSearch
    }
)(App);
