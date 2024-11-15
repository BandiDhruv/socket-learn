var app = require('express')();
var http = require('http').Server(app);

var path=require('path');
var io = require('socket.io')(http);

app.get('/',function(req,res){
    var options = {
        root:path.join(__dirname)
    }
    var filename = "index.html"
    res.sendFile(filename,options);
})
io.on('connection',function(socket){
    console.log('a user connected');
    socket.on('disconnect',function(){
        console.log('a user disconnected');
    })
})
http.listen(5000,function(){
    console.log("server running on 5000");
})
