var express = require('express');
var router = express.Router();

var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/demo", {native_parser:true});
db.bind('s_users');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { user:req.session.user});
});

router.get('/userslist',function(req,res,next){
	db.s_users.find({}).toArray(function(error,arrResult){
		res.json(arrResult)
	})
})
module.exports = router;
