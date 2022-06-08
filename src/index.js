let main = document.getElementById("array");
let sizeInput = document.getElementById("size-input");
let speedInput = document.getElementById("speed-input");
let size = 21;
let min = 21;
let defaultMargin = 50;
const CHANGE = "red";
const DEFAULT = "green";
let speed = 200;
let isSorting = false;

const generateArr = () => {
  let i;
  main.innerHTML = '';
  let width = defaultMargin - (size-min) - 5;
  if(width < 20) {
    width = 20;
  }
  let height;
  for( i = 0; i<size; i++ ) {
    height = Math.ceil(Math.random() * 150);
    if(height < 50) {
      height += 30;
    }
    let div = document.createElement('div');
    div.classList.add("elem");
    div.style.height = `${height}px`;
    div.style.width = `${width}px`;
    main.append(div);
  }
}


const redraw = () => {
  size = sizeInput.value;
  console.log(size);
  generateArr();
}

const getSpeed = () => {
  speed = speedInput.value * 10; 
  console.log(speed);
}


const sleep = (milliseconds=speed)=> {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}



const swap = (elem1, elem2) =>  {
  let temp = elem1.style.height;
  elem1.style.height = elem2.style.height;
  elem2.style.height = temp;
}

const cmp = (elem1, elem2) => {
  return elem1.offsetHeight > elem2.offsetHeight;
}


const color = (elem, color=DEFAULT) => {
  elem.style.backgroundColor = color;
}

const bubble = async () => {
  let arr = document.querySelectorAll(".elem");
  for(let i=0; i<arr.length; i++ ){
    for(let j = 1; j<arr.length;j++) {
      color(arr[j],  CHANGE);
      color(arr[j-1], CHANGE);
      await sleep();
      if(cmp(arr[j-1], arr[j])) { 
        swap(arr[j-1], arr[j]);
        await sleep();
      }
      color(arr[j]);
      color(arr[j-1]);
    }
  }
  isSorting = false;
}

const insertion = async () => {
  let arr = document.querySelectorAll(".elem");
  let i = 1; 
  let j = 0;
  while( i < arr.length ) {
    j = i; 
    const tmp = j;
    color(arr[tmp], CHANGE); 
    color(arr[tmp-1], CHANGE);
    while(j > 0 && cmp(arr[j-1], arr[j])) {
      color(arr[j], CHANGE); 
      color(arr[j-1], CHANGE);
      await sleep();
      swap(arr[j], arr[j-1]);
      color(arr[j]); 
      color(arr[j-1]);
      j-=1;
    }
    await sleep();
    color(arr[tmp]); 
    color(arr[tmp-1]);
    i+=1;
  }
  isSorting = false;
}

function bogo(arr=document.querySelectorAll(".elem")){
    var isSorted = function(arr){
        for(var i = 1; i < arr.length; i++){
            if (cmp(arr[i-1], arr[i])) {
                return false;
            }
        }
        return true;
    };

    function shuffle(arr) {
        var count = arr.length, temp, index;

        while(count > 0){
            index = Math.floor(Math.random() * count);
            count--;
            temp = arr[count].style.height;
            arr[count].style.height = arr[index].style.height;
            arr[index].style.height = temp;
        }

        return arr;
    }

   async function sort(arr){
        var sorted = false;
        while(!sorted) {
            for(let i = 0; i<arr.length;i++) {
              color(arr[i], CHANGE); 
            }
            arr = shuffle(arr);
            await sleep(300);
            sorted = isSorted(arr);
            for(let i = 0; i<arr.length;i++) {
              color(arr[i]); 
            }
            await sleep(100);
        }
        return arr;
    }

    return sort(arr);
}




const sort = (f) => {
  if(isSorting) {
    generateArr();
  }
  isSorting = true;
  f();
}



generateArr();
