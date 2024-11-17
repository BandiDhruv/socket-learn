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

var users=0;

// io.on('connection',function(socket){
//     users++;
//     console.log('a user connected');
//     socket.emit('newUserConnected',{message:"Hello"});
//     socket.broadcast.emit('newUserConnected',{message:users + "users connected"});
//     // setTimeout(function(){
//         //     socket.send("Sent message from server by prereserved events");
//         // },1500)
//         // setTimeout(function(){
//             //     socket.emit("myCustomEvent",{
//                 //         data:"Hello this is dummy data"            
//                 //     });
//                 // },1500)
    
//     // socket.on("myCustomEventFromClientSide",function(data){
//         //     console.log(data);
//         // })
//         io.sockets.emit('broadcast',{message :  users + "users connected!"})
//         socket.on('disconnect',function(){
//         users--;
//         socket.broadcast.emit('newUserConnected',{message:users  + "users connected"});
//         // io.sockets.emit('broadcast',{message :  users + "users connected!"})
//         console.log('a user disconnected');
//     })
// })

// var cnsp = io.of('/custom-namespace')
var roommno=1;
var cnt=0;


io.on('connection',function(socket){
    cnt++;
    console.log("A user Connected");
    if(cnt>=2){
        cnt=0;
        roommno++;
    }
    // io.emit('testEvent',"Tester Event Called");
    socket.join("room - "+ roommno);
    io.sockets.in("room - "+ roommno).emit('connectedRoom',"you are connected to room no" + roommno);
    socket.on('disconnect',function(){
        console.log("A user Disconnected");
    })
})
http.listen(5000,function(){
    console.log("server running on 5000");
})
