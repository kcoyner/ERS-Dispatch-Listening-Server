/**
 * src/component/NotFound/NotFound.jsx
 */

import React from 'react'
import ReactDOM from 'react-dom'
import styled from "styled-components";

export default class NotFound extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
  }

  render () {
    return (
      <div>
        <p>404</p>
        <p>Page not found.  Sorry.</p>
      </div>
    )
  }
}
