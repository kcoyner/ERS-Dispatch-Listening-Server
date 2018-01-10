/*
 * src/CallListEntry.jsx
 */

import React from 'react';

const CallListEntry = (props) => (
  <div className="call-row">
    <div className="call-data">
      { props.callTimeout.split(' ')[1].split(':').slice(0, 2).join(':') }
      &nbsp;
      { props.callTimeout.split(' ')[0].split('-').slice(0, 2).join('-') }
    </div>
    <div className="call-data">
      { props.callDescription }
    </div>
    <div className="call-data">
      { props.callDistrict }
    </div>
    <div className="call-data">
      { props.callLocation }
    </div>
    <div className="call-data">
      { props.callLocation === props.callPremiseName ?
        '' :
        props.callPremiseName
      }
    </div>
    <div className="call-data">
      { props.callCrossStreets.split(' ').splice(3) }
    </div>
    <div className="call-data">
      { props.callAssignment.split(',').slice(1) }
    </div>
    <div className="call-data">
      { props.callRadioFreq.split(',')[0] }
    </div>
    <div className="call-data">
      { props.callMap.split(' ')[2] }
    </div>
    <div className="call-data">
      { props.callRemarks }
    </div>
  </div>

);

export default CallListEntry;
