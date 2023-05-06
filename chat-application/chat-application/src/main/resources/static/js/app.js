var sendToUserName = "companyGroup";
var receivedFromUserName = null;
//var messageFrom = "Lahiru";
var isPublicMessageSend = false;

function clickOnSendToUserNameButton(username) {
    sendToUserName = username;
    console.log(sendToUserName);
}

function clickOnReceivedFromUserNameButton(username) {
    receivedFromUserName = username;
    console.log(receivedFromUserName);
}

$(function() {
    $("form").on('submit', function(e) {
        e.preventDefault(); //Do not refresh the page..
    });
    $("#connect").click(function() {
        connect();
    });
    $("#disconnect").click(function() {
        disconnect();
    });
});

var stompClient = null;

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    } else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function connect() {
    var socket = new SockJS('http://localhost:8080/websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function(frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        document.getElementById("connectData").innerHTML = "Successfully Connected..";
        document.getElementById("disconnectData").innerHTML = "";

        stompClient.subscribe('/count/number', function(message) {
            countNumber(JSON.parse(message.body));
        });
        stompClient.subscribe('/allUser/message', function(message) {
            showPublicMessage(JSON.parse(message.body));
        });
        stompClient.subscribe('/user/specificUser', function(message) {
            showPrivateMessage(JSON.parse(message.body));
        });
    });

    getLogInUser();

    //Ti should be called at page loading time.But it is not working.That's way it has been called from here..
    initContactList();
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
    document.getElementById("disconnectData").innerHTML = "Disconnected..";
    document.getElementById("connectData").innerHTML = "";
}


function sendPublicMessage(sendToUserName, message) {
    stompClient.send("/chatApp/publicMessage", {}, JSON.stringify({
        'messageTo': 'companyGroup',
        'messageText': message
    }));
    isPublicMessageSend = true;
}

function sendPrivateMessage(sendToUserName, message) {
    stompClient.send("/chatApp/privateMessage", {}, JSON.stringify({
        'messageTo': sendToUserName,
        'messageText': message
    }));
}

function showPublicMessage(message) {
    if(!isPublicMessageSend){
        receivedNewMessage(message.messageTextRes,"CompanyGroup")
    }
    isPublicMessageSend = false;
}

function showPrivateMessage(message) {
    receivedNewMessage(message.messageText,message.messageFrom);
}

function countNumber(number) {
    document.getElementById("countNumber").innerHTML = number;
}

function checkIsNotConnection(){
    var isNotConnect = !stompClient || !stompClient.connected;
    if(isNotConnect){
        alert("Please make the connection.");
    }
    return isNotConnect;
}
//..........................................................................................................................


function initContactList(){
    var contacts = document.getElementsByClassName("contact");
    for (var i = 0; i < contacts.length; i++) {
      contacts[i].addEventListener("click", function() {
      var current = document.getElementsByClassName("active");
      current[1].className = current[1].className.replace(" active", "");
      this.className += " active";
      });
    }
}

/*
document.querySelector('#new_message').addEventListener('keypress', function (e) {
console.log("Press Key.");
    if (e.key === 'Enter') {
     console.log("Press Enter Key.");
    }
});
*/

function showMessages(name) {

    if(checkIsNotConnection()){
        return false;
    }

    sendToUserName = name;
    console.log(name);
    document.getElementById("CompanyGroup").style.display = "none";
    document.getElementById("Alex").style.display = "none";
    document.getElementById("Rox").style.display = "none";
    document.getElementById("Joe").style.display = "none";

    document.getElementById("chatWithPersionImage").innerHTML = "<img src='image/" + name + ".jpg' alt='' style='width: 45px; height: 45px;' />";

    document.getElementById(name).style.display = "block";
}

function getLogInUser() {
        var uri = "http://localhost:8080/getUser";
        $.get(uri, function (data) {
            $('#login_user_data').empty();
            $('#login_user_data').append('<img src="image/'+data+'.jpg" class="online" alt="" style="width: 45px; height: 45px;" /><p style="font-size: 12px;">'+data+'</p>');

        });
}

function receivedNewMessageTest() {
    message = $(".message-input input").val();
    if ($.trim(message) == '') {
        return false;
    }
    $('<li class="sent"><img id="profile-img" src="image/alex.jpg" class="online" alt="" style="width: 20px; height: 20px;" /><p>' + message + '</p></li>').appendTo($('.messages ul'));
    $('.message-input input').val(null);
    $('.contact.active .preview').html('<span>You: </span>' + message);
    $(".messages").animate({
        scrollTop: $(document).height()
    }, "fast");
};

function receivedNewMessage(message,messageFrom) {
    if ($.trim(message) == '') {
        return false;
    }

    var divId = "#"+messageFrom+" ul";
    $('<li class="sent"><img id="profile-img" src="image/alex.jpg" class="online" alt="" style="width: 20px; height: 20px;" /><p>' + message + '</p></li>').appendTo($(divId));
    $('.message-input input').val(null);
    $('.contact.active .preview').html('<span>You: </span>' + message);
    $(".messages").animate({
        scrollTop: $(document).height()
    }, "fast");
};

function newMessage() {

    if(checkIsNotConnection()){
        return false;
    }

    var message = $(".message-input input").val();
    if ($.trim(message) == '') {
        return false;
    }

    if (!sendToUserName || sendToUserName === "" || sendToUserName === "CompanyGroup") {
        sendPublicMessage(sendToUserName, message);
    } else {
        sendPrivateMessage(sendToUserName, message);
    }
    var divId = "#"+sendToUserName+" ul";
    $('<li class="replies"><img id="profile-img" src="image/alex.jpg" class="online" alt="" style="width: 20px; height: 20px;" /><p>' + message + '</p></li>').appendTo($(divId));
    $('.message-input input').val(null);
    $('.contact.active .preview').html('<span>You: </span>' + message);
    $(".messages").animate({
        scrollTop: $(document).height()
    }, "fast");

};
