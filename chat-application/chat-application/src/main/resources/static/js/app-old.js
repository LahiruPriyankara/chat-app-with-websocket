var sendToUserName = null;
var receivedFromUserName = null;
var messageFrom = "Lahiru";

function clickOnSendToUserNameButton(username){
    sendToUserName = username;
    console.log(sendToUserName);
}

function clickOnReceivedFromUserNameButton(username){
    receivedFromUserName = username;
    console.log(receivedFromUserName);
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();//Do not refresh the page..
    });
    $( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });

    $( "#send-public-message" ).click(function() { sendPublicMessage(); });
    $( "#send-private-message" ).click(function() { sendPrivateMessage(); });

});

var stompClient = null;
function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function connect() {
    var socket = new SockJS('http://localhost:8080/websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        document.getElementById("connectData").innerHTML="Successfully Connected..";
        document.getElementById("disconnectData").innerHTML="";

         stompClient.subscribe('/count/number', function (message) {
            countNumber(JSON.parse(message.body));
        });
        stompClient.subscribe('/allUser/message', function (message) {
            showPublicMessage(JSON.parse(message.body));
        });
        stompClient.subscribe('/user/specificUser', function (message) {
            showPrivateMessage(JSON.parse(message.body));
        });
    });
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
    document.getElementById("disconnectData").innerHTML="Disconnected..";
    document.getElementById("connectData").innerHTML="";
}

function sendPublicMessage() {
    stompClient.send("/chatApp/publicMessage", {}, JSON.stringify({'messageTo':'','messageText': $("#inputMessage").val()}));
}

function sendPrivateMessage() {
    if(sendToUserName && sendToUserName !==""){
        stompClient.send("/chatApp/privateMessage", {}, JSON.stringify({'messageTo':sendToUserName,'messageText': $("#inputMessage").val()}));
    }else{
        window.alert("Please select a user to send message.");
    }
}

function showPublicMessage(message) {
   $("#message").append("<br/><b><i><span>" + message.messageFrom+":</span></i></b><span style='color:green'>" + message.messageText+"</span>");
}

function showPrivateMessage(message) {
    $("#receivedPrivateMessage").append("<br/>"+message.messageText);
}

function countNumber(number) {
    document.getElementById("countNumber").innerHTML=number;
}

