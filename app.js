var express = require('express')
var bodyParser = require('body-parser');
var app = express()

var mongoutil = require('./mongoutil.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function (req, res) {
  res.send('Hello World!')
})

//A quick test to see if the angularjs is able to handle a basic json object. if the mongodb can produce an object in the same format, there should be no problem on the front end.
/*app.get('/getslots',function(req,res){
	res.send([{name:'',phone:'', time:'9:00am'},{name:'',phone:'', time:'10:00am'},{name:'',phone:'', time:'11:00am'},{name:'',phone:'', time:'12:00pm'},{name:'',phone:'', time:'1:00pm'},{name:'',phone:'', time:'2:00pm'},{name:'',phone:'', time:'3:00pm'},{name:'',phone:'', time:'4:00pm'},{name:'',phone:'', time:'5:00pm'}]);
})*/
mongoutil.connectToServer(function(err){
	var db = mongoutil.getDb();
	var collection = db.collection('slots');
	app.get('/getslots',function(req,res){
		collection.find({},{_id:0}).toArray(function(err,result){
			res.send(result);
		})
		
	})
	//a quick test to make sure that the express middleware json parser is working. takes a JSON object and sends it back to user.
	app.post('/testjsonparser', function (req, res) {
	  if (!req.body) return res.sendStatus(400)
		res.send(JSON.stringify(req.body, null, 2));
	  // create user in req.body
	})
	app.post('/updateslot', function(req,res){
		console.log('req.body:'+ req.body);
		var body = req.body;
		console.log('req.body.time'+ body.time);
		console.log('req.body.phone'+ body.phone);
		collection.findAndModify({time:body.time},[],{$set:{name:body.name, phone:body.phone}},function(err,result){
			res.send('Ok');
		})
	})
	app.use(express.static('.'))

	app.listen(3000, function () {
	  console.log('Example app listening on port 3000!')
	})
});
