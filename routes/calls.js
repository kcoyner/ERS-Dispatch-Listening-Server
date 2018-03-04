/**
 * routes/calls.js
 */

const express = require('express')
const router = express.Router()
const cuid = require('cuid')
const subDays = require('date-fns/sub_days')
const Apparatus = require('../models/apparatus')
const Call = require('../models/call')
const emailTransporter = require('../util/sendEmailSES')

const DEBUG = true // set this to true to suppress sending POST requests to Dynamo

// GET calls listing for last x numberOfDays
var numberOfDays = 3
router.get('/', function (req, res, next) {
  let startDate = subDays(Date.now(), numberOfDays)
  Call.scan().where('createdAt').gte(startDate).exec( (err, data) => {
    let allCalls = Object.keys(data.Items).map(function (k) {
      return data.Items[k].attrs
    })
    let sortedCalls = allCalls.slice(0)
    sortedCalls.sort((a, b) => b.cfs_no - a.cfs_no)
    let filteredCalls = sortedCalls.filter(call => call.test_call === false )
    err ?
      console.error(`DYNAMO FETCH ERROR: ${err}`)
    :
      res.send(filteredCalls)
  })
})

const processData = (data) => {
  let slug = cuid.slug()
  let assignment = data.UnitList.split(',').splice(1).join(' ')
  let radioFreq = data.UnitList.split(',')[0]
  let crossStreet = data.x_street_name.split(' ').splice(3).join(' ')
  let mapRef = data.x_street_name.split(' ').splice(0, 3).join(' ')
  let cfsNo = Number.parseInt(data.cfs_no)
  let callDetails = {
    assignment: assignment,
    radio_freq: radioFreq,
    apt_no: data.apt_no,
    call_category: data.call_category,
    call_description: data.call_description,
    call_type: data.call_type,
    cfs_no: cfsNo,
    cfs_remark: data.cfs_remark,
    city: data.city,
    dispatch_fire: data.dispatch_fire,
    latitude: data.latitude,
    location: data.location,
    longitude: data.longitude,
    premise_name: data.premise_name,
    priority_amb: data.priority_amb,
    priority_fire: data.priority_fire,
    priority_pol: data.priority_pol,
    timeout: data.rec_dt,
    cross_street: crossStreet,
    map_ref: mapRef,
    test_call: data.test_call,
    zip: data.zip,
    slug: slug
  }
  return callDetails
}

const sendToDynamo = (processedData) => {
  var newCall = new Call(processedData)
  console.log('processedData.slug.in.sendToDynamo: ', processedData.slug);
  newCall.save(function (err) {
    if (err) {
      console.log('err: ', err)
    } else {
      console.log('created new item in DynamoDB calls: ', newCall.get('call_id'))
    }
  })
}

// // scan users that have a tracking equal to the assignment engines
// const getTargetedUsers = (apparatusArr) => {
//   apparatusArr.forEach(apparatus => {
//     Apparatus.query(apparatus).exec( (err, data) => {
//       if (err) {
//         console.log('Apparatus Error: ', err)
//       } else {
//         // console.log('Apparatus data: ', data.Items[0].attrs.apparatusId)
//         console.log('Apparatus data: ', data.Items)
//       }
//     })
//   })
// }

const sendEmail = (data) => {
  emailTransporter.sendMail({
      from: 'postmaster@signalclick.com',
      to: '2035160005@msg.fi.google.com, 8057060651@vtext.com',
      subject: 'GFD Call',
      text: `\nCall type: ${data.call_category}
Location: ${data.location}  ${data.city}
Assignment: ${data.assignment}
Details: https://ers-dispatch.firebaseapp.com/?id=${data.slug}
      `
  }, (err, info) => {
      if (err) {
          console.error(err)
      } else {
          console.log(info.envelope);
          console.log(info.messageId);
      }
  });
}

// // scan users that have a tracking equal to the assignment engines
// const getTargetedUsers = (apparatusArr, callback) => {
//   apparatusArr.forEach(apparatus => {
//     Apparatus.query(apparatus).exec( (err, data) => {
//       if (err) {
//         console.log('Apparatus Error: ', err)
//       } else {
//         data.Items.forEach(eng => {
//           if (eng.attrs.trackedBy !== undefined) {
//             console.log('eng1.attrs.trackedBy: ', eng.attrs.trackedBy);
//           }
//         })
//       }
//       callback(data.Items)
//     })
//   })
// }


const getTargetedUsers = (apparatus, callback) => {
    Apparatus.query(apparatus).exec( (err, data) => {
      if (err) {
        console.log('Apparatus Error: ', err)
      } else {
        // console.log('data.Items[0]: ', data.Items[0]);
        if (data.Items[0].attrs.trackedBy !== undefined) {
          console.log('apparatus.attrs.trackedBy: ', data.Items[0].attrs.trackedBy);
          callback(data.Items[0].attrs.trackedBy)
        }
        // data.Items.forEach(eng => {
        //   if (eng.attrs.trackedBy !== undefined) {
        //     console.log('eng1.attrs.trackedBy: ', eng.attrs.trackedBy);
        //   }
        // })
      }
    })
}

// POST calls listing
router.post('/', async function (req, res) {
  let callQuery = null

  if (Object.values(req.query).length !== 0) {
    /* x-www-form-urlencoded, therefore use req.query */
    callQuery = req.query
  } else {
    /* raw, therefore use req.body and JSON.parse it */
    callQuery = JSON.parse(req.body)
  }

  if (DEBUG === true) {
    // send to Dynamo and email
    let processedData = await processData(callQuery)
    let apparatusStr = processedData.assignment
    apparatusArr = apparatusStr.replace(/\s+/g,' ').trim().split(' ')
    console.log((apparatusArr))  // i.e. ['E1', 'E2']

    async function getUserEmails(app) {
      let v
      try {
        v = await getTargetedUsers(apparatusArr[0], function(data) {
          console.log('WOW data: ', data);
          return data
        })
      } catch (e) {
        console.log('ERROR: ', e);
      }
      console.log('LOOK v: ', v);
      return v
    }
    // .then(function(v) {
    //   return v
    // })

    let x = getUserEmails(apparatusArr)
    x.then(function(result){
      console.log('MY result: ', result);
    })
    console.log('xxxxxx: ', x);

    // var myEng = await Apparatus.query(apparatusArr[0]).exec( (err, data) => {
    //   if (err) {
    //     console.log('Apparatus Error: ', err)
    //   } else {
    //     console.log('MY data: ', data);
    //     return data
    //   }
    // })
    // console.log('myEng: ', myEng);

      // console.log('MY data: ', data);
      // return data
      // receivers.push(data)
      // console.log('receivers-inside: ', receivers);
      // return receivers

      // data.forEach(eng => {
      //   if (eng.attrs.trackedBy !== undefined) {
      //     console.log('eng2.attrs.trackedBy: ', eng.attrs.trackedBy.join(','));
      //     receivers.push(eng.attrs.trackedBy.join(','))
      //   }
      //   // uniqueReceivers = new Set(receivers)
      //   // finalReceivers = Array.from(uniqueReceivers)
      // })
      // console.log('TOP receivers: ', receivers);

      // const uniqueReceivers = new Set(receivers)
      // const finalReceivers = Array.from(uniqueReceivers)
      // console.log('Receivers: ', JSON.stringify(finalReceivers));
      // console.log('Receivers: ', (data));

      // data.forEach(user => {
      //   if (user.attrs.trackedBy !== undefined) {
      //     console.log('user.attrs.trackedBy: ', user.attrs.trackedBy);
      //   }
      // })
    // })
    // console.log('stuff-outside: ', stuff);

    res.send(`DEBUG:  Your POST of ${JSON.stringify(callQuery)} was successful but was not sent to Dynamo`)
  } else {
    let processedData = await processData(callQuery)
    await sendToDynamo(processedData)
    sendEmail(processedData)
    res.send(`SUCCESS: Your POST of ${JSON.stringify(processedData)} was successful`)
  }
})

module.exports = router
