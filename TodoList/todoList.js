const inputEle = document.getElementById("input");
const addBtn = document.getElementById("addBtn");
const taskBox = document.querySelector(".taskContainer");
const colorInput = document.getElementById("color");

let taskArray = [];

addBtn.addEventListener("click", function(){
  const task  = inputEle.value.trim();
  const color = colorInput.value;
if(task==="") {
  alert("please enter any text");
  return;
}
  let obj = {
           taskName: task,
           taskColor: color,
           id : Date.now(),
  }
  taskArray.push(obj);
  localStorage.setItem("task",JSON.stringify(taskArray));
  taskCreate(taskArray);
})

//  task create function 

function taskCreate(Array){
   inputEle.value= "";
taskBox.innerHTML="";
  for(let i =0; i<Array.length; i++){
  const taskContainer = document.createElement("div");
  taskContainer.classList.add("task");
  taskContainer.style.backgroundColor = Array[i].taskColor;
  let details = `<p>${Array[i].taskName}</p>
      <svg class="deletBtn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M4 8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8ZM6 10V20H18V10H6ZM9 12H11V18H9V12ZM13 12H15V18H13V12ZM7 5V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V5H22V7H2V5H7ZM9 4V5H15V4H9Z"></path></svg>`
  taskContainer.innerHTML = details;     
      const deleteBtn = taskContainer.querySelector(".deletBtn");
      deleteBtn.addEventListener("click", function(){
        taskArray.splice(i,1);
        localStorage.setItem("task",JSON.stringify(taskArray));
        taskCreate(taskArray);
      })
    taskBox.appendChild(taskContainer);
  }
}

// localStorage data acces
(()=>{
  let localStorageData = localStorage.getItem("task");
  if(localStorageData){
    taskArray = JSON.parse(localStorageData);
    taskCreate(taskArray);
  }
})();
