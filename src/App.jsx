/**
 * src/App.jsx
 *
 */

import React, { Component } from 'react'

// TODO: need this import?
// import {
//   BrowserRouter as Router,
//   Route,
//   Switch,
//   Link
// } from 'react-router-dom'

import Calls from './components/Calls'
import Home from './components/Home'
import Users from './components/Users'
import NotFound from './components/NotFound'
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
