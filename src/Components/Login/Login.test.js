/* eslint-disable no-sequences */
import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login';

import {BrowserRouter as Router} from 'react-router-dom';

if("renders without crashing", () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Router>
      <Login />
    </Router>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});