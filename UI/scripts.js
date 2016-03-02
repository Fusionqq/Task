function run(){
	var appContainer = document.getElementsByClassName('main')[0];

	appContainer.addEventListener('click', delegateEvent);
	appContainer.addEventListener('keydown', delegateEvent);
}

function delegateEvent(evtObj) {
	if((evtObj.type === 'click' && evtObj.target.classList.contains('todo-button')) || evtObj.keyCode == 13){
		onAddButtonClick(evtObj);
	}
}

function onAddButtonClick(){
	var todoText = document.getElementById('todoText');

	addTodo(todoText.value);
	todoText.value = '';

} 

function addTodo(value) {
	if(!value){
		return;
	}
	
	var item = createItem(value);
	var name = createName('Sasha');
	var items = document.getElementsByClassName('items')[0];

	items.appendChild(name);
	items.appendChild(item);

}

function createItem(text){
	var divItem = document.createElement('li');
	var but = document.createElement('button');

	but.setAttribute('id', 'gal');
	but.classList.add('galBut');
	divItem.classList.add('item');

	divItem.appendChild(but);
	divItem.appendChild(document.createTextNode(text));

	return divItem;
}

function createName(text) {
	var divName = document.createElement('li');

	divName.classList.add('myName');
	
	divName.appendChild(document.createTextNode(text));
	
	return divName;
}

function actionForGalBut() {
	document.getElementById('gal').addEventListener('dblclick', function() {
		document.getElementById('gal').style.width = "25px";
		document.getElementById('gal').style.height = "25px";
	})
}





