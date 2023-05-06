/*
var contacts = document.getElementsByClassName("contact");
for (var i = 0; i < contacts.length; i++) {
  contacts[i].addEventListener("click", function() {
  var current = document.getElementsByClassName("active");
  current[1].className = current[1].className.replace(" active", "");
  this.className += " active";
  });
}

function showMessages(name){
console.log(name);
document.getElementById("companyGroup").style.display = "none";
document.getElementById("alex").style.display = "none";
document.getElementById("rok").style.display = "none";
document.getElementById("joe").style.display = "none";

document.getElementById("chatWithPersionImage").innerHTML = "<img src='image/"+name+".jpg' alt='' style='width: 45px; height: 45px;' />";

document.getElementById(name).style.display = "block";
}

function receivedNewMessageTest() {
	message = $(".message-input input").val();
	if($.trim(message) == '') {
		return false;
	}
	$('<li class="sent"><img id="profile-img" src="image/alex.jpg" class="online" alt="" style="width: 20px; height: 20px;" /><p>' + message + '</p></li>').appendTo($('.messages ul'));
	$('.message-input input').val(null);
	$('.contact.active .preview').html('<span>You: </span>' + message);
	$(".messages").animate({ scrollTop: $(document).height() }, "fast");
};

function receivedNewMessage(message) {
	if($.trim(message) == '') {
		return false;
	}
	$('<li class="sent"><img id="profile-img" src="image/alex.jpg" class="online" alt="" style="width: 20px; height: 20px;" /><p>' + message + '</p></li>').appendTo($('.messages ul'));
	$('.message-input input').val(null);
	$('.contact.active .preview').html('<span>You: </span>' + message);
	$(".messages").animate({ scrollTop: $(document).height() }, "fast");
};

function newMessage() {
	message = $(".message-input input").val();
	if($.trim(message) == '') {
		return false;
	}
	$('<li class="replies"><img id="profile-img" src="image/alex.jpg" class="online" alt="" style="width: 20px; height: 20px;" /><p>' + message + '</p></li>').appendTo($('.messages ul'));
	$('.message-input input').val(null);
	$('.contact.active .preview').html('<span>You: </span>' + message);
	$(".messages").animate({ scrollTop: $(document).height() }, "fast");
};

*/