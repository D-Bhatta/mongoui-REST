//dependencies
var mongo = require('mongodb');
var express = require('express');
var monk = require('monk');

var db = monk('localhost:27017/test');//db host address
var app = new express();//start a new express instance


app.use(express.static(__dirname + '/public'));//serve up static files in the directory
app.get('/', function(req,res){//respond to a get request
    db.driver.admin.listDatabases(function(e,dbs){//return all databases
        res.json(dbs);//return a resource as json
    });
});

app.get('/collections', function(req,res){//respond to a get request for 'collections'
    db.driver.collectionNames(function(e,names){//return collection names
        res.json(names);//return a resource as json
    });
});

app.get('/collections/:name', function(req,res){//respond to a get request for 'collections/:name'
    var collection = db.get(req.params.name);//return specific name from within collection 
    collection.find({},{limit:20},function(e,docs){
        res.json(docs);
    })
});

app.post('/collections',function(req,res){//respond to a get request for 'collections'
    db.driver.collectionNames(function(e,names){//return collection names
        res.json(names);//return a resource as json
    });
});

app.post('/collections/:name', function(req,res){//respond to a get request for 'collections/:name'
    var collection = db.get(req.params.name);//return specific name from within collection 
    collection.find({},{limit:20},function(e,docs){
        res.json(docs);
    })
});



app.listen(3000)