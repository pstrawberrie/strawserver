/**
 * Chat
*/

import React from 'react';
//import moment from 'moment';

export default class Chat extends React.Component {

  state = {
    messages: []
  };

  componentDidMount() {
    this.getLocalMessages();
  }

  getLocalMessages() {
    const history = localStorage.getItem('chathistory');
    // if(history) {

    // }
  }

  renderMessages() {
    this.props.messages.map()
  }

  render() {
    return (
      <section className="chat">
        <div className="chat__window">

        </div>
        <form className="chat__input">
          <input type="text" className="chat__input_message"></input>
        </form>
      </section>
    );
  }
};
