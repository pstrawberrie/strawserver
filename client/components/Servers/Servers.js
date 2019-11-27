/**
 * Servers Status Component (Nav + Modal)
 */

import React from 'react';
import './Servers.scss';

export default class Servers extends React.Component {

  state = {
    servers: this.props.servers,
    chat: this.props.chat,
    isInNav: this.props.isInNav,
    isModal: this.props.isModal,
  }

  render() {
    const { isInNav, isModal, servers } = this.props;

    function renderServersQuickview() {
      servers.map((server, index) => {
        const isUp = server.data ? true : false;
        const baseClassName = 'servers__nav-quickview_icon';
        const statusClassName = isUp ? `${baseClassName} up` : `${baseClassName} down`;
        console.log(statusClassName);

        return (
          <div className={statusClassName} key={index}>
            asdf
          </div>
        );
      })
    }

    return (
      <>
        <If condition={isInNav}>
          <div className="servers__nav-quickview">
            {renderServersQuickview()}
          </div>
        </If>
        <If condition={isModal}>
          <div className="servers__modal">
            Servers Modal
          </div>
        </If>
      </>
    );
  }

}
