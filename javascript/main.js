var list = [];

printArray(list);

var buttonAdd = document.getElementById("addNumber");
buttonAdd.addEventListener("click", addItem);

var buttonOrder = document.getElementById("sortNumber");
buttonOrder.addEventListener("click", sortItems);

function printArray(arrayNumber){
	var list = document.getElementById("list");
	list.innerHTML = "";
	for (var i = arrayNumber.length - 1; i >= 0; i--) {
		var span = document.createElement("span");
		span.setAttribute("contenteditable", true);
		span.setAttribute("data-id", i);
		var texto = document.createTextNode(arrayNumber[i]);
		span.appendChild(texto);
		list.appendChild(span);
	}
}

function addItem(event){
	event.preventDefault();
	var item = document.getElementById("inputNumber").value;
	list.push(item);
	printArray(list);
}

function sortItems(event){
	event.preventDefault();
	list.sort();
	list.reverse();
	printArray(list);
}