/* eslint-disable no-sequences */
import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';

import {BrowserRouter as Router} from 'react-router-dom';

if("renders without crashing", () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Router>
      <Home />
    </Router>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});