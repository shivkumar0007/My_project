const addBtn = document.querySelector(".add_ticket_button");
const ticketCreateBox =document.querySelector(".ticket_create_box");
const colorChiseContainer = document.querySelector(".color_chise_container");
const ticketText = document.querySelector(".ticket_text_add");
const ticketContainerBox = document.querySelector(".ticket_container_box");
const showAllTicketBtn = document.querySelector(".show_all_ticket");
const deleteBtn = document.querySelector(".ticket_delete_button");
const navColorContainer = document.querySelector(".color_container");



let ticket_lock = `<div class="ticket_lock"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="white"><path d="M6 8V7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7V8H20C20.5523 8 21 8.44772 21 9V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V9C3 8.44772 3.44772 8 4 8H6ZM19 10H5V20H19V10ZM11 15.7324C10.4022 15.3866 10 14.7403 10 14C10 12.8954 10.8954 12 12 12C13.1046 12 14 12.8954 14 14C14 14.7403 13.5978 15.3866 13 15.7324V18H11V15.7324ZM8 8H16V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V8Z"></path></svg></div>`;

let ticket_unlock = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="red"><path d="M7 10H20C20.5523 10 21 10.4477 21 11V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V11C3 10.4477 3.44772 10 4 10H5V9C5 5.13401 8.13401 2 12 2C14.7405 2 17.1131 3.5748 18.2624 5.86882L16.4731 6.76344C15.6522 5.12486 13.9575 4 12 4C9.23858 4 7 6.23858 7 9V10ZM5 12V20H19V12H5ZM10 15H14V17H10V15Z"></path></svg>`

// ticket Create Box Hide and unhide 

function ticketCreateBoxHide(){
 ticketCreateBox.classList.toggle("hide");
}
// default color
 let choseColor = "red";

addBtn.addEventListener("click", ticketCreateBoxHide);

//color chose container 
colorChiseContainer.addEventListener("click", function(e){
 let targetContainer = e.target;
 choseColor = targetContainer.classList[1];
 if(!choseColor) return ;
 let allColor = document.querySelectorAll(".color_chose");
 for(let i=0; i<allColor.length;i++){
   allColor[i].classList.remove("activeColor");
 }
 targetContainer.classList.add("activeColor");
   ticketText.focus();
});
 // store to all task 
let taskArrays = [];


// ticket color 
let colorFilter = ["red","blue","green","black"];

   // same color tickte  array
   let sameColorTicket =[];

// ticket create box part
ticketText.addEventListener("keydown",function(event){
  let keyPressed = event.key;
  let taskText = ticketText.value;
  if(keyPressed=="Enter"){
    let currentTaskObj = {
      taskText: taskText,
      color: choseColor,
      id: Date.now(),
    };
    taskArrays.push(currentTaskObj);
    localStorage.setItem("ticketObj",JSON.stringify(taskArrays));
   ticketCreatefunction(taskArrays);

    ticketCreateBoxHide();
  }
 
});
  
 function ticketCreatefunction(taskArray){
  
      ticketContainerBox.innerHTML = "";
      
      for(let i=0; i<taskArray.length; i++){
         let taskObj = taskArray[i];
          
           let ticketDiv = document.createElement("div");
      ticketDiv.classList.add("ticket_box");

       ticketDiv.innerHTML= "";
      ticketDiv.innerHTML = ` <div class="ticket_color ${taskObj.color}"></div>
     
  <div class="ticket_text" contenteditable="false">
      ${taskObj.taskText} </div>
        ${ticket_lock}`


        // delete ticket 
 ticketDiv.addEventListener("dblclick", function () {

  
  if (!deleteFlag) return;
  // array se delete
  taskArrays = taskArrays.filter(function (task) {
    return task.id !== taskObj.id;
  });
 localStorage.setItem("ticketObj",JSON.stringify(taskArrays));
  
  ticketCreatefunction(taskArrays);
});



// color change ticket , after ticket create 

  let colorChanger = ticketDiv.querySelector(".ticket_color");
  colorChanger.addEventListener("click", function(){
     
      let currentClr = taskObj.color;
       
       // current index
  let currentIndex = colorFilter.indexOf(currentClr);
  console.log(currentIndex);
 // next Index 
 let nextInd = (currentIndex +1)%colorFilter.length;
 let nextColor = colorFilter[nextInd];

 colorChanger.classList.remove(currentClr);
 colorChanger.classList.add(nextColor);
 taskObj.color = nextColor;

  })
 
  // ticket text edit function

  let textLockBtn = ticketDiv.querySelector(".ticket_lock");
  let ticketTextDiv = ticketDiv.querySelector(".ticket_text");

  let lockFlag = false;

  textLockBtn.addEventListener("click", function(){
        if(!lockFlag){
          textLockBtn.innerHTML = ticket_unlock;
          ticketTextDiv.setAttribute("contenteditable", "true");
        }else{
          textLockBtn.innerHTML = ticket_lock;
          ticketTextDiv.setAttribute("contenteditable", "false");
          taskObj.taskText = ticketTextDiv.innerText;
          localStorage.setItem("ticketObj",JSON.stringify(taskArrays));
        }
        lockFlag=!lockFlag;
  })

 ticketContainerBox.appendChild(ticketDiv);
      }
     ticketText.value = "";
   
 }

 //  delete button on / off
   let deleteFlag = false;
 deleteBtn.addEventListener("click", function(){
      if(!deleteFlag){
        deleteBtn.style.color = "red";
      }else{
         deleteBtn.style.color = "black";
      }
      deleteFlag=!deleteFlag;
 })

 // show all ticket 

 showAllTicketBtn.addEventListener("click", function(){
  
  ticketCreatefunction(taskArrays);
 })

 // same color tickte show 

 navColorContainer.addEventListener("click", function(e){
  let sameColor = e.target.classList[1];
  if(!sameColor) return ;
     sameColorTicket.length = 0;
  for(let i=0; i<taskArrays.length; i++){
       if(sameColor==taskArrays[i].color){
           sameColorTicket.push(taskArrays[i]); 
       }
  }
  ticketCreatefunction(sameColorTicket);
 });



 (()=>{
  let localStorageData = localStorage.getItem("ticketObj");
  if(localStorageData){
    taskArrays= JSON.parse(localStorageData);
    ticketCreatefunction(taskArrays);
  }
})();