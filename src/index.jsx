/*
 * src/index.jsx
 */

import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ['hello']
    };
    this.getCalls = this.getCalls().bind(this);
  }

  componentDidMount() {
    this.getCalls();
  }

  // getCalls() {
  //   $.ajax({
  //     url: '/calls',
  //     type: 'GET',
  //     dataType: 'json',
  //     ContentType: 'application/json',
  //     success: function(calls) {
  //       this.setState({data: calls});
  //     }.bind(this),
  //     error: function(jqXHR) {
  //       console.log('AJAX ERROR: ', jqXHR);
  //     }.bind(this)
  //   });
  // }

  render() {
    return (
      <div>
        <h1>Listening</h1>
        <div className="app">
          <h3>
          </h3>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
