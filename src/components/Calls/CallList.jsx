/**
 * src/components/Calls/CallList.jsx
 */

import React from 'react';
import CallListEntry from './CallListEntry.jsx';
import {
  Title,
  Subtitle,
  CallTable,
  // Entry,
  Wrapper
} from './CallList-css.js'

const CallList = ( {callData} ) => (
  <Wrapper>
    <Title>Call List</Title>

        <Subtitle>
          <h2>Timeout</h2>
          <h2>Description</h2>
          <h2>District</h2>
          <h2>Location</h2>
          <h2>Premise</h2>
          <h2>Cross Streets</h2>
          <h2>Assignment</h2>
          <h2>Radio Freq</h2>
          <h2>Map</h2>
          <h2>Remarks</h2>
        </Subtitle>

    <CallTable>
      {callData.map((call, idx) => (
        <CallListEntry
          callTimeout={ call.timeout }
          callDescription={ call.call_description }
          callDistrict={ call.city }
          callLocation={ call.location }
          callPremiseName={ call.premise_name }
          callCrossStreets={ call.cross_street }
          callAssignment={ call.assignment }
          callRadioFreq={ (call.radio_freq) }
          callMap={ call.map_ref }
          callRemarks={ call.cfs_remark }
          key={ idx }
        />
      ))}
    </CallTable>

  </Wrapper>
)

export default CallList;
