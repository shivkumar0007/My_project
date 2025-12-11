const addBtn = document.querySelector(".add_ticket_button");
const ticketCreateBox =document.querySelector(".ticket_create_box");
const colorChiseContainer = document.querySelector(".color_chise_container");


addBtn.addEventListener("click", function(){
  ticketCreateBox.classList.toggle("hide");
});

colorChiseContainer.addEventListener("click", function(e){
  let ticketColor = window.getComputedStyle(e.target).backgroundColor;
  
})