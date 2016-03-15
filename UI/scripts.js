var id = 0;
var username = "Sasha";
var taskList = [];
function run(){
	var appContainer = document.getElementsByClassName('main')[0];

	appContainer.addEventListener('click', delegateMessage);
	appContainer.addEventListener('keydown', delegateMessage);
	//restore();	 
}

function delegateMessage(evtObj) {
	if(evtObj.type === 'click' && evtObj.target.classList.contains('changename-button')) {
		changeName(evtObj);
	}
	if((evtObj.type === 'click' && evtObj.target.classList.contains('todo-button')) || evtObj.keyCode == 13) {
		sendMessage(evtObj);
	}
}

function changeName() {
    var input = document.getElementById('name');
    var but1 = document.getElementsByClassName('delBut');
    var but2 = document.getElementsByClassName('redBut');

    for(var i = 0; i < but1.length; i++){
        if(input.value!=username)
        but1[i].hidden = true;
    }
     for(var i = 0; i < but2.length; i++){
        if(input.value!=username)
        but2[i].hidden = true;
    }
    username = input.value;         
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

	divItem.addEventListener('keydown', function(e){
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
	
	taskList.push(divName);
	taskList.push(divItem);
	store(taskList);

	var box = document.getElementById('Box');
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
	var but1 = document.getElementById('del' + id);
	input.value = text.innerHTML;
	input.hidden = false;
	text.hidden = true;
	but1.hidden = true;

	input.addEventListener('keydown', function(e) {
		if(e.keyCode == 13) {
			text.innerHTML = input.value;
			input.hidden = true;
			text.hidden = false;
			but1.hidden = false;
		}
	});		
}

function changeMessage2(id) {
	var text = document.getElementById('textDiv' + id);
	var input = document.getElementById('textIn' + id);
	var but1 = document.getElementById('del' + id);
	input.hidden = true;
	text.hidden = false;
	but1.hidden = false;
}

function changeMessage3(id) {
	var text = document.getElementsByClassName('Txt');
	var input = document.getElementsByClassName('In');
	var but1 = document.getElementsByClassName('delBut');
	for (var i = 0; i < text.length; i++) {
		text[i].hidden = false;
	}
	for (var i = 0; i < input.length; i++) {
		input[i].hidden = true;
	}
	for (var i = 0; i < but1.length; i++) {
		but1[i].hidden = false;
	}
}

function restore() {
	var item = localStorage.getItem("TODOs taskList");
	alert(item);
	return item && JSON.parse(item);
}

function store(listToSave) {
	localStorage.setItem("TODOs taskList", JSON.stringify(listToSave));
}



		





	






