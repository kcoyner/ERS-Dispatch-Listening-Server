/**
 * src/index.js
 *
 */

import React from 'react'
import ReactDOM from 'react-dom'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

import store from './store'
import { Provider } from 'react-redux'

import App from './App.jsx'

ReactDOM.render(
  <Provider store={ store }>
    <Router>
      <Switch>
        <App />
      </Switch>
    </Router>
  </Provider>, document.getElementById('app'))

