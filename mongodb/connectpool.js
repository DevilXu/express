var mongo = require('mongoskin');
var poolModule = require('generic-pool');
var pool = poolModule.Pool({
    name     : 'mongoPool',
    create   : function(callback) {
        var mongodb = mongo.db("mongodb://localhost:27017/demo", {native_parser:true});
        mongodb.open(function (err, db) {
            callback(err, db);
        })
    },
    destroy  : function(mongodb) {
        mongodb.close();
    },
    max      : 100,
    min      : 5,
    idleTimeoutMillis : 30000,
    log      : true
});

module.exports = pool ;