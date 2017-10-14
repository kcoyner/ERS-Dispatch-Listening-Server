/*
 * src/CallList.jsx
 */

import React from "react";

import CallListEntry from './CallListEntry.jsx';

const CallList = ( {callData} ) => (

  <div className="call">
    <h3>Call List</h3>

    <div className="call-table">
      <div className="call-row">
        <div className="call-data">Timeout</div>
        <div className="call-data">Description</div>
        <div className="call-data">District</div>
        <div className="call-data">Street Number</div>
        <div className="call-data">Street Name</div>
        <div className="call-data">Cross Streets</div>
        <div className="call-data">Assignment</div>
        <div className="call-data">Radio Freq</div>
        <div className="call-data">Map</div>
      </div>

      {callData.map((call, idx) => (
        <CallListEntry
          callTimeout={ call.timeout }
          callDescription={ call.description }
          callDistrict={ call.district }
          callStreetNumber={ call.streetnumber }
          callStreetName={ call.streetname }
          callCrossStreets={ call.crossstreets }
          callAssignment={ call.assignment }
          callRadioFreq={ call.radiofreq }
          callMap={ call.map }
          key={ idx }
        />
      ))}
    </div>
  </div>
);

export default CallList;
