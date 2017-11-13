var list = [];

printArray(list);

var buttonAdd = document.getElementById("addNumber");
buttonAdd.addEventListener("click", addItem);

var buttonOrder = document.getElementById("sortNumber");
buttonOrder.addEventListener("click", sortNumber);

// PRINT NUMBER

function printArray(arrayNumber){
	var list = document.getElementById("list");
	list.innerHTML = "";
	for (var i = arrayNumber.length - 1; i >= 0; i--) {
		// Insert numbers into span
		var span = document.createElement("span");
		span.setAttribute("contenteditable", true);
		span.setAttribute("data-id", i);
		var texto = document.createTextNode(arrayNumber[i]);
		span.appendChild(texto);
		list.appendChild(span);
	}
}

// BUBBLE SORT ALGORITHM FUNCTION

function bubbleSort(items) {  
    var length = items.length;
    // Start bubble sort algorithm
    for (var i = (length - 1); i >= 0; i--) {
        //Number of passes
        for (var j = (length - i); j > 0; j--) {
            //Compare the adjacent positions
            if (parseInt(items[j]) < parseInt(items[j - 1])) {
                //Swap the numbers
                var tmp = items[j];
                items[j] = items[j - 1];
                items[j - 1] = tmp;
            }
        }
    }
}

// ADD NUMBER TO ARRAY FUNCTION

function addItem(event){
	event.preventDefault();
	var item = document.getElementById("inputNumber").value;
	// Verify no-repeat number
	if (list.indexOf(item + " ") < 0) {
		// Print number with a space
		list.push(item + " ");
		printArray(list);
		// Clear input
		document.getElementById("inputNumber").value = "";
	}
}

// SORT NUMBERS INTO ARRAY 

function sortNumber(event){
	event.preventDefault();
	// Sort numbers
	bubbleSort(list)
	list.reverse();
	// Print array
	printArray(list);
}