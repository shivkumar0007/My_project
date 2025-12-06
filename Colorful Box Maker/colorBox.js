const input = document.querySelector("#input");

const button = document.querySelector("#button");
const boxContainer = document.querySelector("#boxContainer");

let color = document.querySelector("#color");
let text = document.querySelector("#textInput");
// console.dir(color);

button.addEventListener("click", function() {
const numberOfBox= input.value;
// console.dir(input);
let boxColor = color.value;

boxContainer.innerHTML= "";
for(let i =1; i<=numberOfBox; i++){
  let box = document.createElement("div");
  box.classList.add("square");
  box.style.backgroundColor = boxColor;
  box.innerText = text.value;
  boxContainer.appendChild(box);

}
});