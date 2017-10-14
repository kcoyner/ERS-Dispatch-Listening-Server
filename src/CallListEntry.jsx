/*
 * src/CallListEntry.jsx
 */

import React from "react";

const CallListEntry = (props) => (
  <div className="call-row">
    <div className="call-data">{props.callTimeout}</div>
    <div className="call-data">{props.callDescription}</div>
    <div className="call-data">{props.callDistrict}</div>
    <div className="call-data">{props.callStreetNumber}</div>
    <div className="call-data">{props.callStreetName}</div>
    <div className="call-data">{props.callCrossStreets}</div>
    <div className="call-data">{props.callAssignment}</div>
    <div className="call-data">{props.callRadioFreq}</div>
    <div className="call-data">{props.callMap}</div>
  </div>

);

export default CallListEntry;
