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

    // setTimeout(function(){
    //     socket.send("Sent message from server by prereserved events");
    // },1500)
    // setTimeout(function(){
    //     socket.emit("myCustomEvent",{
    //         data:"Hello this is dummy data"            
    //     });
    // },1500)
    
    socket.on("myCustomEventFromClientSide",function(data){
        console.log(data);
    })
    socket.on('disconnect',function(){
        console.log('a user disconnected');
    })
})
http.listen(5000,function(){
    console.log("server running on 5000");
})
