'use strict';
import React, {Component} from 'react';

class Header extends Component {
    render() {
        return (
            <div className='results-header'>
                {this.props.children}
            </div>
        );
    }
}

export default Header;
