/**
 * Nav Component
 */

import React from 'react';
import Servers from '../Servers/Servers';
import './Nav.scss';

export default class Nav extends React.Component {
  render() {
    console.log('in nav', this.props);

    return(
      <nav className="nav">
        <ul className="nav__main">
          {/* <li>
            <a className="nav__main_link" href="#testlink">Test Link</a>
          </li>
          <li>
            <a className="nav__main_link" href="#testlink2">Test Link 2</a>
          </li>*/}
        </ul>
        <Servers isInNav={true} servers={this.props.servers} />
      </nav>
    );
  }
}
