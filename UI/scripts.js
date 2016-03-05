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
	var div = document.createElement('div');
	var but1 = document.createElement('button');
	var but2 = document.createElement('button');
	var input = document.createElement('input');
   		
	but1.classList.add('delBut');
	but2.classList.add('redBut');
	divItem.classList.add('item');
	divName.classList.add('myName');

	divItem.setAttribute('id', 'divId' + id);
	div.setAttribute('id', 'textDiv' + id);
	input.setAttribute('id', 'textIn' + id);
	input.setAttribute('class', 'In');

	var s = new String(id);
	div.innerHTML = todoText.value;

	but1.addEventListener('click', function(){
		deleteMessage(s);
	});

	but2.addEventListener('click', function(){
		changeMessage(s);
	});

	divItem.appendChild(but1);
	divItem.appendChild(but2);
	divItem.appendChild(div);
	divItem.appendChild(input);
	divName.appendChild(document.createTextNode(username));
	input.hidden = true;
	div.hidden = false;

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
	var div = document.getElementById('textDiv' + id);
	var input = document.getElementById('textIn' + id);
	input.value = div.innerHTML;
	input.hidden = false;
	div.hidden = true;

	input.addEventListener('keydown', function(e) {
		if(e.keyCode == 13) {
			div.innerHTML = input.value;
			input.hidden = true;
			div.hidden = false;
		}
	});		
}



		





	






