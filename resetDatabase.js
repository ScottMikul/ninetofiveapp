var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/test';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
	insertDocuments(db, function(){

	db.close();
	});
});

var insertDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('slots');
  // Insert some documents
  collection.insertMany([{name:'',phone:'', time:'9:00am'},{name:'',phone:'', time:'10:00am'},{name:'',phone:'', time:'11:00am'},{name:'',phone:'', time:'12:00pm'},{name:'',phone:'', time:'1:00pm'},{name:'',phone:'', time:'2:00pm'},{name:'',phone:'', time:'3:00pm'},{name:'',phone:'', time:'4:00pm'},{name:'',phone:'', time:'5:00pm'}], function(err, result) {
	assert.equal(err, null);
	console.log("Inserted me slots successfully.");
	callback(result);
  });
}
