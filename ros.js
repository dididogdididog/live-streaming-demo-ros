import { speakMessage } from "./streaming-client-api.js";
const ros = new ROSLIB.Ros({
    url: 'ws://localhost:9090'
  });
  
ros.on('connection', function() { console.log('Connected to websocket server.');});
ros.on('error', function(error) { console.log('Error connecting to websocket server: ', error); window.alert('Error connecting to websocket server'); });
ros.on('close', function() { console.log('Connection to websocket server closed.');});

const speak_checkbox=document.getElementById("speak-checkbox");

// Subscribing to a Topic
// ----------------------

const listener = new ROSLIB.Topic({
ros : ros,
name : '/listener',
messageType : 'std_msgs/String'
});

listener.subscribe(function(message) {
console.log('Received message on ' + listener.name + ': ' + message.data);
speakMessage(message.data);
});

// Publishing a Topic
// ------------------

const micControl=new ROSLIB.Topic({
    ros:ros,
    name:'/mic_control',
    messageType:'std_msgs/Bool'
})

setInterval(()=>{
    const data=new ROSLIB.Message({data:speak_checkbox.checked});
    micControl.publish(data);
},100)