/**
 * Index
 */
import './client.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import IndexPage from './components/IndexPage/IndexPage';

// Render React Components
document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <IndexPage />,
    document.getElementById('index-root')
  );
});
