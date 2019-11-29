/**
 * Index Parent Component
 */

import React from 'react';
import io from 'socket.io-client';

import Nav from '../Nav/Nav';
import Chat from '../Chat/Chat';
import Servers from '../Servers/Servers';

export default class IndexPage extends React.Component {
  /**
   * State
   */
  state = {
    servers: [],
    chat: [],
  }

  /**
   * Did Mount
   */
  componentDidMount() {
    // Get Initial State
    this.getInitialState();

    // Fire Up Sockets
    this.handleSockets();
  }

  /**
   * Update Chat
   */
  updateChat(data) {
    console.log('updateChat in IndexPage:', data);
  }

  /**
   * Get Initial Page Data
   */
  getInitialState() {
    //const rootEle = document.getElementById('index-root');

    // Get Servers Data
    // let serversData = rootEle.getAttribute('data-servers');
    // serversData = serversData ? JSON.parse(serversData) : [];

    // this.setState({servers: serversData});
  }

  /**
   * Handle Websockets
   */
  handleSockets() {
    const socket = io('http://localhost:3000');
    socket.on('connect', () => {
      socket.emit('servers', {
        some: 'data'
      });
    });
    socket.on('servers', (data) => {
      console.log('Got serverStatus socket from server:', data);
      this.setState({servers: data});
    });
  }

  render() {
    return (
      <>
        <Nav servers={this.state.servers} />
        <main id="main-content">
          <Chat data={this.state.chat} />
        </main>
        <Servers servers={this.state.servers} isModal={true} />
      </>
    );
  }
}
