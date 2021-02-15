/* eslint-disable no-sequences */
import React from 'react';
import ReactDOM from 'react-dom';
import Edit from './Edit';

import {BrowserRouter as Router} from 'react-router-dom';

if("renders without crashing", () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Router>
      <Edit />
    </Router>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});