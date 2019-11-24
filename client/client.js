/**
 * Index
 */
import './client.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import Nav from './components/Nav/Nav';

// Render React Components
document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Nav/>,
    document.getElementById('nav')
  );
});
