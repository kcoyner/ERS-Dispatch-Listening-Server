/**
 * src/component/Users/Users.jsx
 */

import React from 'react'
import ReactDOM from 'react-dom'

export default class Users extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      userData: []
    }
    this.getUsers = this.getUsers.bind(this)
  }

  componentDidMount () {
    this.getUsers()
  }

  getUsers () {
    axios.get('/users')
    .then( (response) => {
      console.log(response)
      this.setState({
        userData: response
      })
    })
    .catch( (error) => {
      console.error(error)
    })
  }

  render () {
    return (
      <div>
        hello
        {this.state.userData}
      </div>
    )
  }
}
