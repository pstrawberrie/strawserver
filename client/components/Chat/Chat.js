/**
 * Chat
*/

import React from 'react';
//import moment from 'moment';
import './Chat.scss';

export default class Chat extends React.Component {

  state = {
    messages: [],
    isChatActive: false,
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
    return this.props.messages.map((message, index) => {
      const cleanedText = message.text.trim();
      const cleanedName = message.user.trim();

      return (
        <p className="chat__window_message" key={index}>
          <span className="chat__window_message_timestamp"></span>
          <span className="chat__window_message_name"></span>
          <span className="chat__window_message_text"></span>
        </p>
      )
    });
  }

  render() {
    return (
      <section className="chat">
        <button className="chat__trigger"
                aria-controls="chat-inner"
                aria-expanded={this.state.isChatActive ? 'true' : 'false'}
                onClick={() => this.setState({isChatActive: !this.state.isChatActive})}></button>
        <div className="chat__inner" id="chat-inner" aria-hidden={this.state.isChatActive ? 'false' : 'true'}>
          <div className="chat__window">

          </div>
          <form className="chat__input">
            <input type="text" className="chat__input_message"></input>
          </form>
        </div>
      </section>
    );
  }
};
