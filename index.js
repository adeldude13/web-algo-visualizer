let main = document.getElementById("array");
let input = document.getElementById("in");   
const LENGTH = 20;
let isSorting = false; 

const generateElements = () => {
	for(var i = 0; i<LENGTH;i++) {
		let elem = document.createElement("div");
		elem.style.backgroundColor = "red";
		elem.style.margin = "10px"; 
		elem.className = "elem";
		elem.style.height = `${(Math.random()+1) * 100}px`;
		elem.style.width= `20px`;
		elem.style.display = "inline-block";	
		main.appendChild(elem);
	}
}

const sleep = (milliseconds=500) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}


const bubble = async (delay=500) => {
	if(isSorting) {
		return 1;
	}
	let arr = document.querySelectorAll(".elem");
	for(let i = 0; i<LENGTH;i++) {
		for(let j = 1; j<LENGTH; j++) {
			arr[j].style.backgroundColor = "green";
			arr[j-1].style.backgroundColor = "green";
			await sleep(delay);
			// offsetHeight
			if(arr[j].offsetHeight < arr[j-1].offsetHeight) {
				let temp = arr[j].style.height;
				arr[j].style.height = arr[j-1].style.height;
				arr[j-1].style.height = temp;
				sleep(delay);
			}
			arr[j].style.backgroundColor = "red";
			arr[j-1].style.backgroundColor = "red";
		}
	}
	isSorting = false;
}

const sort = () => {
	// currenlty only apply bubble sort
	try {	
		let delay = parseInt(input.value);
		if(isNaN(delay)) {
			throw UserException("InvalidInput");
		}
		console.log(`using Delay : ${delay}`);
		bubble(delay);
	} catch {
		console.log("using the default timing");
		bubble();
	}
}

generateElements();
