/**
 * Nav Component
 */

import React from 'react';
import './Nav.scss';
import io from 'socket.io-client';

export default class Nav extends React.Component {

  /**
   * State
   */
  state = {
    user: {},
    links: [
      {
        title: 'Home',
        url: '/',
      },
      {
        title: 'Error',
        url: '/errorpageidontexist',
      },
    ],
    serverStatus: {},
  };

  /**
   * Did Mount
   */
  componentDidMount() {
    this.handleSockets();
  }

  /**
   * Handle Sockets
   */
  handleSockets() {
    const socket = io('http://localhost:3000');
    socket.on('connect', () => {
        socket.emit('serverStatus', {
            some: 'data'
        });
    });
    socket.on('serverStatus', (data) => {
        console.log('Got serverStatus socket from server:', data);
    });
  }

  /**
   * Render
   */
  render() {
    const name = this.state.user.name  || 'User';
    const links = this.state.links.map((link, index) =>
      <li key={index}>
        <a className="nav__main_link" href={link.url}>{link.title}</a>
      </li>
    );

    return(
      <>
        <ul className="nav__main">
          {links}
        </ul>
        <div className="nav__user">
          <button className="nav__user_trigger">
            {name}
          </button>
        </div>
      </>
    );
  }
}
