/**
 * src/components/Calls/CallList.jsx
 */

import React from 'react';
import CallListEntry from './CallListEntry.jsx';
import {
  Title,
  Subtitle,
  Entry,
  Wrapper
} from './CallList-css.js'

const CallList = ( {callData} ) => (
  <Wrapper>
    <Title>Call List</Title>

        <Subtitle>
        Timeout
        Description
        District
        Location
        Premise
        Cross Streets
        Assignment
        Radio Freq
        Map
        Remarks
        </Subtitle>

      <Entry>
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
      </Entry>
  </Wrapper>
)

export default CallList;
