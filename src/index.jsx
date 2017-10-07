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
      data: [],
      callData: []
    };
    // this.getCalls = this.getCalls().bind(this);
  }

  componentDidMount() {
    this.getCalls();
  }

  getCalls() {
    $.ajax({
      url: '/calls',
      type: 'GET',
      dataType: 'json',
      ContentType: 'application/json',
      success: function(calls) {
        this.setState({data: [1,2,3,4,5]});
        this.setState({callData: calls})
      }.bind(this),
      error: function(jqXHR) {
        console.log('AJAX ERROR: ', jqXHR);
      }.bind(this)
    });
  }

  render() {
    return (
      <div>
        <h1>Call List</h1>
        <div className="app">
          <ul>

            {this.state.callData}

            {this.state.data.map(function (listValue){
              return <li>{listValue}</li>;
            })}

          </ul>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
