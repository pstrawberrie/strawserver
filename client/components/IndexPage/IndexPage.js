/**
 * Index Parent Component
 */

import React from 'react';
import io from 'socket.io-client';

import Nav from '../Nav/Nav';
import Chat from '../Chat/Chat';

export default class IndexPage extends React.Component {
  /**
   * State
   */
  state = {
    status: {},
    chat: {},
  }

  /**
   * Did Mount
   */
  componentDidMount() {
    this.handleSockets();
  }

  /**
   * Update Chat
   */
  updateChat(data) {
    console.log('updateChat in IndexPage:', data);
  }


  /**
   * Handle Websockerts
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

  render() {
    return (
      <>
        <Nav serverStatus={this.state.serverStatus} />
        <main id="main-content">
          <Chat data={this.state.serverChat} />
        </main>
      </>
    );
  }
}
