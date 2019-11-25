/**
 * Nav Component
 */

import React from 'react';
import './Nav.scss';

export default class Nav extends React.Component {
  render() {
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
        <div className="nav__user">
          {/* <button className="nav__user_trigger">
            User
          </button> */}
        </div>
      </nav>
    );
  }
}
