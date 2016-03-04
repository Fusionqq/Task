var counter = 0;
function run(){
	var appContainer = document.getElementsByClassName('main')[0];

	appContainer.addEventListener('click', changeName);
	appContainer.addEventListener('click', sendMessage);
	appContainer.addEventListener('keydown', sendMessage);
	appContainer.addEventListener('click', deleteMessage);
}


function changeName() {
    var input = document.getElementById('name');
 
    var s = document.getElementsByClassName('myName');
 
    for (var i = 0; i < s.length; i++) {
    	s[i] = input.value;
    }
}

function sendMessage(evtObj){
	if((evtObj.type === 'click' && evtObj.target.classList.contains('todo-button')) || evtObj.keyCode == 13) {
		var todoText = document.getElementById('todoText');
		var itemName = document.getElementById('name');
		var divItem = document.createElement('li');
		var divName = document.createElement('li');
		var but1 = document.createElement('button');
		var but2 = document.createElement('button');
   
		but1.classList.add('delBut');
		but2.classList.add('redBut');
		divItem.classList.add('item');
		divName.classList.add('myName');

		//divItem.setAttribute('id' , 'liId' + counter);

		divItem.appendChild(but1);
		divItem.appendChild(but2);
		divItem.appendChild(document.createTextNode(todoText.value));
		divName.appendChild(document.createTextNode(itemName.value));

		if(todoText.value != "") {
			document.getElementById('list').appendChild(divName);
			document.getElementById('list').appendChild(divItem);
		}

		todoText.value = "";
		counter++;
	}	
}

function deleteMessage() {
	
}






