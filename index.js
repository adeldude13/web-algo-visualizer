let main = document.getElementById("array");
let sizeInput = document.getElementById("size-input");
let size = 21;
let min = 21;
let defaultMargin = 50;

const generateArr = () => {
  let i;
  main.innerHTML = '';
  let width = defaultMargin - (size-min);
  for( i = 0; i<size; i++ ) {
    let div = document.createElement('div');
    div.classList.add("elem");
    div.style.height = `${Math.ceil(Math.random()* 100)}px`;
    div.style.width = `${width}px`;
    main.append(div);
  }
}

const redraw = () => {
  size = sizeInput.value;
  console.log(size);
  generateArr();
}


const sleep = (milliseconds=500) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}



generateArr();
