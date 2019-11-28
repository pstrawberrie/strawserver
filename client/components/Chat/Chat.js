/**
 * Chat
*/

import React from 'react';
//import moment from 'moment';
import './Chat.scss';

export default class Chat extends React.Component {

  constructor() {
    super();

    this.handleChatTriggerClick = this.handleChatTriggerClick.bind(this);
    this.handleNameFormSubmit = this.handleNameFormSubmit.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChatNameInput = this.handleChatNameInput.bind(this);
    this.handleChatInput = this.handleChatInput.bind(this);
  }

  state = {
    messages: [],
    chatHistory: null,
    chatName: null,
    isChatNameSet: false,
    isChatActive: false,
    chatInputValue: '',
  };

  messageInputRef = React.createRef();
  nameInputRef = React.createRef();

  componentDidMount() {
    this.getLocalStorage();

    // Add Document ESC Key listener to close chat
    document.addEventListener('keydown', (e) => {
      const key = e.which || e.keyCode;
      if(key === 27 && this.state.isChatActive) this.setState({isChatActive: false});
    });
  }

  getLocalStorage() {
    const chatName = localStorage.getItem('chatName');
    const chatHistory = localStorage.getItem('chatHistory');
    if(chatName) this.setState({chatName, isChatNameSet: true});
    if(chatHistory) this.setState({chatHistory});
  }

  // Chat Trigger Click
  handleChatTriggerClick() {
    this.setState({isChatActive: !this.state.isChatActive}, () => {
      if(this.state.isChatActive) {
        if(this.state.isChatNameSet) {
          this.focusChatMessageInput();
        } else {
          this.focusChatNameInput();
        }
      }
    });
  }

  // Chat Name Input
  handleChatNameInput(event) {
    this.setState({chatName: event.target.value});
  }

  // Chat Message Input
  handleChatInput(event) {
    this.setState({chatInputValue: event.target.value});
  }

  // Name Form Submit
  handleNameFormSubmit(event) {
    event.preventDefault();
    if(this.state.chatName.trim() === '') return;

    this.setState({isChatNameSet: true}, () => {
      localStorage.setItem('chatName', this.state.chatName);
      this.focusChatMessageInput();
    });
  }

  // Message Form Submit
  handleFormSubmit(event) {
    event.preventDefault();
    if(this.state.chatInputValue.trim() === '') return;

    // Reset Input Value
    this.setState({chatInputValue: ''});
  }

  // Focus Input Methods
  focusChatMessageInput() { this.messageInputRef.current.focus() }
  focusChatNameInput() { this.nameInputRef.current.focus() }

  renderMessages() {
    return this.props.messages.map((message, index) =>
      <p className="chat__window_message" key={index}>
        <span className="chat__window_message_timestamp"></span>
        <span className="chat__window_message_name"></span>
        <span className="chat__window_message_text"></span>
      </p>
    );
  }

  render() {
    return (
      <section className="chat">
        <button className="chat__trigger"
                aria-controls="chat-inner"
                aria-expanded={this.state.isChatActive ? 'true' : 'false'}
                onClick={this.handleChatTriggerClick}></button>
        <div className={`chat__inner ${this.state.isChatNameSet ? '' : 'name'}`}
             id="chat-inner"
             aria-hidden={this.state.isChatActive ? 'false' : 'true'}>
          <Choose>
            <When condition={this.state.isChatNameSet}>
                <div className="chat__window"></div>
                <form className="chat__input" onSubmit={this.handleFormSubmit}>
                  <input type="text"
                         className="chat__input_message"
                         ref={this.messageInputRef}
                         value={this.state.chatInputValue}
                         onChange={this.handleChatInput}></input>
                </form>
            </When>
            <Otherwise>
            <form className="chat__input chat__input--name" onSubmit={this.handleNameFormSubmit}>
                  <label htmlFor="chat__input_name" className="chat__input_name-label">
                    Set Username:
                  </label>
                  <input type="text"
                         id="chat__input_name"
                         className="chat__input_name"
                         ref={this.nameInputRef}
                         value={this.state.chatNameInputValue}
                         onChange={this.handleChatNameInput}></input>
                </form>
            </Otherwise>
          </Choose>
        </div>
      </section>
    );
  }
};
