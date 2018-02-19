/**
 * src/App.jsx
 *
 */

import React, { Component } from 'react'

// TODO: need this import?
import {
  BrowserRouter as Router,
  Route
//   Switch,
//   Link
} from 'react-router-dom'

import Calls from './components/Calls/CallList.jsx'
import Home from './components/Home/Home.jsx'
import Users from './components/Users/Users.jsx'
import NotFound from './components/NotFound/NotFound.jsx'
// TODO:  add in a webpack compiler for scss and css loader and then uncomment
// import './scss/main.scss'

// TODO: get history to work
// import createBrowserHistory from 'history/createBrowserHistory'
// const history = createBrowserHistory()

export default class App extends Component {
  render() {
    return (
      <div>
        <Route exact path='/' component={ Home } />
        <Route exact path='/home' component={ Home } />
        <Route exact path='/calls' component={ Calls } />
        <Route exact path='/users' component={ Users } />
      </div>
    )
  }
}
