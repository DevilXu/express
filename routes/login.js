var express = require('express');
var router = express.Router();

var pool = require('../mongodb/connectpool');


router.get('/', function(req, res, next) {
	res.render('login');
});

router.post('/login', function(req, res, next) {
	pool.acquire(function (err, mongodb) {
		mongodb.collection('s_users').find({name:req.body.name}).toArray(function(error,arrResult){
		    //这里的 arrResult 是一个查找结果数组
		    if(!arrResult.length){
				mongodb.collection('s_users').insert(req.body);
				req.session.user=req.body;
			 	res.redirect('index');
		    }
		    else{
		    	res.redirect('/');
		    }
		    pool.release(mongodb);
		});
	});


});
router.get('/loginout', function(req, res, next) {
	req.session.user = null ;
	res.redirect('/');
});

module.exports = router;
