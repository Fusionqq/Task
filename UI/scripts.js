var id = 0;
var username = "Sasha";
function run(){
	var appContainer = document.getElementsByClassName('main')[0];

	appContainer.addEventListener('click', delegateMessage);
	appContainer.addEventListener('keydown', delegateMessage);
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
 
    var s = document.getElementsByClassName('myName');
 
    for (var i = 0; i < s.length; i++) {
    	s[i].innerHTML = input.value;
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

	time.setAttribute('id', 't');
	divItem.setAttribute('id', 'divId' + id);
	text.setAttribute('id', 'textDiv' + id);
	input.setAttribute('id', 'textIn' + id);
	input.setAttribute('class', 'In');

	var s = new String(id);
	text.innerHTML = todoText.value;
	textName.innerHTML = username;
	time.textContent = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");

	but1.addEventListener('click', function(){
		deleteMessage(s);
	});

	but2.addEventListener('click', function(){
		changeMessage(s);
	});

	divItem.appendChild(but1);
	divItem.appendChild(but2);
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



		





	






