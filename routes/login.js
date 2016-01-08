var express = require('express');
var router = express.Router();

var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/demo", {native_parser:true});
db.bind('s_users');

router.get('/', function(req, res, next) {
	res.render('login');
});

router.post('/login', function(req, res, next) {
	db.s_users.find({name:req.body.name}).toArray(function(error,arrResult){
	    //这里的 arrResult 是一个查找结果数组
	    if(!arrResult.length){
			db.s_users.insert(req.body);
			req.session.user=req.body;
		 	res.redirect('index');
	    }
	    else{
	    	res.redirect('/');
	    }
	});
});
router.get('/loginout', function(req, res, next) {
	req.session.user = null ;
	res.redirect('/');
});

module.exports = router;
