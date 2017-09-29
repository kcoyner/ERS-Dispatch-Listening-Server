
var data = require('./dummy_data');

var randomCallNumber = Math.floor(Math.random() * data.maindata.length + 1);

var dummyCall = data.maindata[randomCallNumber];

// var json = JSON.stringify(Object.assign({}, data.maindata));

var json = JSON.stringify(Object.assign({}, dummyCall));

console.log(json);
