
  let isOn = false;
  let medium = 0;

const blub = document.querySelector("img");
const para = document.querySelector("p");
blub.addEventListener("click", function(){
  if(!isOn){
    blub.src = "blubLow.jpeg";
    medium = 1;
    isOn = true;
    para.innerText = "ON-Low";
    para.style.color = "lightblue";
  }else if(medium === 1){
    blub.src = "blubHigh.jpeg";
    medium = 0;
    para.innerText = "ON-High";
    para.style.color = "blue";
  }else{
    blub.src = "blubOff.jpeg";
    isOn = false;
    para.innerText = "Off";
    para.style.color = "black";
  }
});
