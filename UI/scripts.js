var id = 0;
var username = "";
var nameList = [];
function run(){
	var appContainer = document.getElementsByClassName('main')[0];

	appContainer.addEventListener('click', delegateMessage);
	appContainer.addEventListener('keydown', delegateMessage);

	username = restoreUserName() || "Default User";
	var input = document.getElementById('name');
	input.value = username;
}

function delegateMessage(evtObj) {
	if((evtObj.type === 'click' && evtObj.target.classList.contains('changename-button')) || 
		(evtObj.type === 'keydown' && evtObj.target.classList.contains('todo-input1') && evtObj.keyCode == 13)) {
		changeName(evtObj);
	}
	if((evtObj.type === 'click' && evtObj.target.classList.contains('todo-button')) || 
		(evtObj.type === 'keydown' && evtObj.target.classList.contains('todo-input2') && evtObj.keyCode == 13)) {
		sendMessage(evtObj);
	}
}

function changeName() {
    var input = document.getElementById('name');
    var but1 = document.getElementsByClassName('delBut');
    var but2 = document.getElementsByClassName('redBut');
   	var name = document.getElementsByClassName('myName');

    for(var i = 0; i < but1.length; i++) {
        if(input.value!=username)
        but1[i].hidden = true;
    }
    for(var i = 0; i < but2.length; i++) {
        if(input.value!=username)
        but2[i].hidden = true;
    }
    for(var i = 0; i < name.length; i++) {
    	if(name[i].innerHTML == input.value) {
    		but1[i].hidden = false;
    		but2[i].hidden = false;
    	}	
    }

    username = input.value;
    nameList = input.value;
    storeUserName();    
}

function restoreUserName() {
	if(typeof(Storage) == "undefined") {
		alert('localStorage is not accessible');
		return;
	}

	var item = localStorage.getItem("User's name");
	return item;
}

function storeUserName() {
	if(typeof(Storage) == "undefined") {
		alert('localStorage is not accessible');
		return;
	}

	localStorage.setItem("User's name", nameList);
}

function sendMessage() {
	var todoText = document.getElementById('todoText');
	var divItem = document.createElement('li');
	var divName = document.createElement('li');
	var textName = document.createElement('div');
	var text = document.createElement('div');
	var time = document.createElement('div');
	var but1 = document.createElement('button');
	var but2 = document.createElement('button');
	var input = document.createElement('input');
	var box = document.getElementById('Box');
   	
	but1.classList.add('delBut');
	but2.classList.add('redBut');
	time.classList.add('time');
	divItem.classList.add('item');
	textName.classList.add('myName');
    
    but1.setAttribute('id','del' + id);
    but2.setAttribute('id','red' + id);
    but2.setAttribute('title','Click to open \nDouble-click to close');
	time.setAttribute('id', 't' + id);
	divItem.setAttribute('id', 'divId' + id);
	text.setAttribute('id', 'textDiv' + id);
	input.setAttribute('id', 'textIn' + id);
	input.setAttribute('class', 'In');
	text.setAttribute('class', 'Txt');

	var s = new String(id);
	text.innerHTML = todoText.value;
	textName.innerHTML = username;
	time.innerHTML = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");

	but1.addEventListener('click', function(){
		deleteMessage(s);
	});

	but2.addEventListener('click', function(){
		changeMessage(s);
	});

	but2.addEventListener('dblclick', function(){
		changeMessage2(s);
	});

	box.addEventListener('keydown', function(e){
		if(e.keyCode == 27){
			changeMessage3(s);
		}
	});

	divItem.appendChild(but2);
	divItem.appendChild(but1);
	divItem.appendChild(text);
	divItem.appendChild(input);
	divName.appendChild(time);
	divName.appendChild(textName);
	
	input.hidden = true;
	text.hidden = false;

	if(todoText.value != "") {
		document.getElementById('list').appendChild(divName);
		document.getElementById('list').appendChild(divItem);
	}

	todoText.value = "";
	id++;
	
	box.scrollTop = 9999;
}


function deleteMessage(id) {
	var k = document.getElementById('divId' + id);

	document.getElementById('divId' + id).innerHTML = 'Сообщение удалено...';
	k.classList.remove('item');
	k.classList.add('myDeletedMessage');
}

function changeMessage(id) {
	var k = document.getElementById('divId' + id);
	var text = document.getElementById('textDiv' + id);
	var input = document.getElementById('textIn' + id);
	
	input.value = text.innerHTML;
	input.hidden = false;
	text.hidden = true;

	input.addEventListener('keydown', function(e) {
		if(e.keyCode == 13) {
			text.innerHTML = input.value;
			input.hidden = true;
			text.hidden = false;
		}
	});		
}

function changeMessage2(id) {
	var text = document.getElementById('textDiv' + id);
	var input = document.getElementById('textIn' + id);
	var but1 = document.getElementById('del' + id);
	input.hidden = true;
	text.hidden = false;
}

function changeMessage3(id) {
	var text = document.getElementsByClassName('Txt');
	var input = document.getElementsByClassName('In');

	for (var i = 0; i < text.length; i++) {
		text[i].hidden = false;
	}
	for (var i = 0; i < input.length; i++) {
		input[i].hidden = true;
	}
}



		





	






