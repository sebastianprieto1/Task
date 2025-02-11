import {TaskManager} from './TaskManager.js';


window.addEventListener("load", () => {  renderRetrievedTasks();
    form.addEventListener("submit", (e) => {
      // e.preventDefault();
      extractData();
      // getAllTasks();
    });
  });
  
  // the Date and Time Functionality
  
  function clockTick() { 
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyy = today.getFullYear();
  let hh = String(today.getHours()).padStart(2, "0");
  let min = String(today.getMinutes()).padStart(2, "0");
  let ss = String(today.getSeconds()).padStart(2,"0");
  let dateSpan = document.getElementById("dateSpan");
  let time = `${hh}:${min}:${ss}`; 
  today = `${dd}-${mm}-${yyy}`;
  dateSpan.innerHTML = `<strong>Date:</strong> ${today} |
   <strong>Time:</strong> ${time}`;
  
  let dateSpanMobile = document.getElementById("dateSpanMobile");
  dateSpanMobile.innerHTML = `<strong>Date:</strong> ${today} |
   <strong>Time:</strong> ${time}`;
  } 

 setInterval(clockTick, 1000)

  
  
  //All the lets in the house
  let taskName = document.getElementById("taskName");
  let assignedTo = document.getElementById("assignedTo");
  let form = document.getElementById("form");
  let setStatus = document.getElementById("setStatus");
  let errorElement = document.getElementById("errorMsg");
  let description = document.getElementById("description");
  var modal = document.getElementById("form");
  var btn = document.getElementById("myBtn");
  var span = document.getElementById("closebtn");
  let dueDate = document.getElementById("dueDate");
  let formDelete = document.getElementById("formDelete");
  let closebtnedit = document.getElementById("closebtnedit");
  let card1 = document.getElementsByClassName("card1");
  let toDoItems = [];
  let inProgressItems = [];
  let reviewItems = [];
  let doneItems = [];
  let modalBtn = document.getElementById("modalBtn");
  let cardsToDo = document.getElementById("cardsToDo");
  let cardsinProgress = document.getElementById("cardsinProgress");
  let cardsReview = document.getElementById("cardsReview");
  let cardsDone = document.getElementById("cardsDone");
  let modalOverlay = document.getElementById("modalOverlay");
  let mobileAddTaskBtn = document.getElementById("addTaskBtnMobile");
  let modalBtnDone = document.getElementById("modalBtnDone");
  let taskNameEdit = document.getElementById("taskNameEdit");
  let assignedToEdit = document.getElementById("assignedToEdit");
  let dueDateEdit = document.getElementById("dueDateEdit");
  let descriptionEdit = document.getElementById("descriptionEdit");
  let setStatusEdit = document.getElementById("setStatusEdit");

  
  //Click events
  btn.onclick = function () {
    modal.style.display = "block";
    modalOverlay.style.opacity = "0.3";
    modalOverlay.style.backgroundColor = "gray";
  };
  span.onclick = function () {
    modal.style.display = "none";
    modalOverlay.style.opacity = "1";
    modalOverlay.style.backgroundColor = "transparent";
  };
  closebtnedit.onclick = function () {
    formDelete.style.display = "none";
    modalOverlay.style.opacity = "1";
    modalOverlay.style.backgroundColor = "transparent";
  };
  mobileAddTaskBtn.onclick = function () {
    modal.style.display = "block";
    modalOverlay.style.opacity = "0.3";
    modalOverlay.style.backgroundColor = "gray";
  };

  modalBtnDone.onclick = function () {
    // 1.) Get the task clicked by the value in the hidden field.
    modalBtnDone.style.display = "none";
    const divElement = this.parentNode;
    const formElement = divElement.parentNode;
    const hiddenFieldValue = formElement[0].value;

    // 2.) Find the id of the task inside the Array and change the status.
    for (let i = 0; i < retrievedArray.length; i++) {
      if (Number(retrievedArray[i].id) === Number(formElement[0].value)) {
        modalBtnDone.style.display = "none";

        retrievedArray[i].newSelectStatus = 'modalDone';
        break;
      }
    }
  
    // 3.) Find the id of the task inside the localStorage and change the status.
    for (let m = 0; m < localStorage.length; m++) {
      if (localStorage.key(m) === formElement[0].value) {
        let obj = JSON.parse(localStorage.getItem(localStorage.key(m)));
        obj.newSelectStatus = 'modalDone';
        localStorage.setItem(obj.id, JSON.stringify(obj));
        break;
      }
    }
  
    // 4.) Close the form.
    formDelete.style.display = "none";
    modalOverlay.style.opacity = "1";
    modalOverlay.style.backgroundColor = "transparent";
    // console.log('refresh');
  
    // 5.) Render the HTML again.
  
  
  }
  
  //Validating the form fields

  let formValidated = false;
  form.addEventListener("submit", (e) => {
    let messages = [];
    if (taskName.value === "") {
      messages.push("Task Name is Required");
    }
    if (taskName.value.length < 8) {
      messages.push("Task Name must be longer than 8 characters");
    }
    if (assignedTo.value == "") {
      messages.push("Task must be assigned");
    }
    if (setStatus.value == "") {
      messages.push("Please set a status.");
    }
    if (dueDate.value === "") {
      messages.push("Please set a due date");
    }
    if (description.value.length < 20) {
      messages.push("Please write a description of at least 20 characters");
    }
    if (messages.length > 0) {
      e.preventDefault();
      errorElement.innerText = messages.join(". ");
    } else {
      messages = [];
      errorElement.innerText = messages;
      return (formValidated = true);
    }
  });
  
  //Grey out past dates- making only future dates clickable
  dueDate.addEventListener("click", function () {
    let today = new Date();
    let dateToday = String(today.getDate()).padStart(2, "0");
    let monthToday = String(today.getMonth() + 1).padStart(2, "0");
    let yearToday = today.getFullYear();
    let minDate = `${yearToday}-${monthToday}-${dateToday}`;
    dueDate.min = minDate;
  });

  function resetFormClearModal() {
      form.reset();
      modal.style.display = "none";
      modalOverlay.style.opacity = "1";
      modalOverlay.style.backgroundColor = "transparent";
      formValidated = false;
  }

let latestID = [Math.max(localStorage.length)];

// console.log(localStorage.length)
function extractData() {

    let ourNewTask = new TaskManager(
      taskName.value,
      assignedTo.value,
      dueDate.value,
      setStatus.value,
      description.value,
      latestID.at(-1)
    );

function storeData(){ 
  localStorage.setItem(ourNewTask.id, JSON.stringify(ourNewTask));
}

    if (formValidated === true && setStatus.value === "modalToDo") {
      toDoItems.push(ourNewTask);
      storeData();
      ourNewTask.renderToDo();
      resetFormClearModal();
      addToArray();
      // console.log(toDoItems);
    }
    if (formValidated === true && setStatus.value === "modalInProgress") {
      inProgressItems.push(ourNewTask);
      storeData();
      ourNewTask.renderInProgress();
      resetFormClearModal();
      addToArray();
    }
    if (formValidated === true && setStatus.value === "modalReview") {
      reviewItems.push(ourNewTask);
      storeData();
      ourNewTask.renderReview()
      resetFormClearModal();
      addToArray();
    }
    if (formValidated === true && setStatus.value === "modalDone") {
      doneItems.push(ourNewTask);
      storeData();
     ourNewTask.renderDone();
      resetFormClearModal();
      addToArray();
    }
    function addToArray() {
      let myID = latestID.at(-1);
      myID++;
      latestID.push(myID);
      }
      
  };


  let retrievedArray = [];
  // function getAllTasks(){
  //   return retrievedArray;
  // }


  for(let i=0; i < localStorage.length; i++) {
    let x = JSON.parse(localStorage.getItem(localStorage.key(i)));
retrievedArray.push(x)
// console.log(retrievedArray)
}

function editTask(a) {
  console.log(a)
  formDelete.style.display = "block";
  modalOverlay.style.opacity = "0.3";
  modalOverlay.style.backgroundColor = "gray";

  for (let i=0; i < retrievedArray.length; i++) {
    //Mark as done button condition if

    if (retrievedArray[i].id === a.id) {
      document.getElementById("setStatus").value = retrievedArray[i].newSelectStatus;
      document.getElementById("hidden-field-id").value = retrievedArray[i].id;

    }
    console.log(a.newSelectStatus)

    if (a.newSelectStatus === "modalDone"){
      modalBtnDone.style.display = 'none'
    } else {
      modalBtnDone.style.display = 'block'
    }

    // modalBtnDone.addEventListener('click', (e) => {
    //   // hide button
    //   e.target.style.display = 'none';
    
    // });

  let x = retrievedArray[i];
 
  if( x.id === a.id )
    {
    taskNameEdit.value = x.newTaskName; //get existing here
assignedToEdit.value = x.newAssignTo;  //get existing here
dueDateEdit.value = x.newDueDate;
setStatusEdit.value = x.newSelectStatus;
descriptionEdit.value = x.newAddDescription;
  }
}

    } 
  function renderRetrievedTasks() {


    for (let i=0; i < retrievedArray.length; i++) {
      // console.log(retrievedArray[i]);
      let x = retrievedArray[i];
      if (x.newSelectStatus === "modalReview"){
        let card = `<div id="${x.id}"><span><img src="./Resources/bluebox.png" alt=""></span>
              <h3> ${x.newTaskName} </h3> 
              <p class="taskDescriptionText"> ${x.newAddDescription} </p>
              <img class= "profileCard" src="./Resources/ProfileUser1.png"> 
              <hr> 
              <p class="dueDateText"><strong>DUE:</strong><span>${x.newDueDate}</span></p></div>`;
    const newDiv = document.createElement("div");
    cardsReview.insertAdjacentElement("beforeend", newDiv);
    newDiv.classList.add("card1");
  
    newDiv.addEventListener("click", () => {
      editTask(x), window.scrollTo(0, 0);
    });
    newDiv.innerHTML = card;

      }
      else if (x.newSelectStatus === "modalToDo"){
        let card = `<div id="${x.id}"><span><img src="./Resources/redbox.png" alt=""></span>
              <h3> ${x.newTaskName} </h3> 
              <p class="taskDescriptionText"> ${x.newAddDescription} </p>
              <img class= "profileCard" src="./Resources/ProfileUser1.png"> 
              <hr> 
              <p class="dueDateText"><strong>DUE:</strong><span>${x.newDueDate}</span></p> </div>`;
    const newDiv = document.createElement("div");
    cardsToDo.insertAdjacentElement("beforeend", newDiv);
    newDiv.classList.add("card1");
    newDiv.addEventListener("click", () => {
      editTask(x), window.scrollTo(0, 0);
    });
    newDiv.innerHTML = card;

      }
      else if (x.newSelectStatus === "modalDone"){
        let card = `<div id="${x.id}"><span><img src="./Resources/greenbox.png" alt=""></span>
              <h3> ${x.newTaskName} </h3> 
              <p class="taskDescriptionText"> ${x.newAddDescription} </p>
              <img class= "profileCard" src="./Resources/ProfileUser1.png"> 
              <hr> 
              <p class="dueDateText"><strong>DUE:</strong><span>${x.newDueDate}</span></p></div>`;
    const newDiv = document.createElement("div");
    cardsDone.insertAdjacentElement("beforeend", newDiv);
    newDiv.classList.add("card1");
    newDiv.addEventListener("click", (e) => {
      console.log(e.target)
      editTask(x), window.scrollTo(0, 0);
    });
    newDiv.innerHTML = card;

      }
      else if (x.newSelectStatus === "modalInProgress"){
        let card = `<div id="${x.id}"><span><img src="./Resources/yellowbox.png" alt=""></span>
              <h3> ${x.newTaskName} </h3> 
              <p class="taskDescriptionText"> ${x.newAddDescription} </p>
              <img class= "profileCard" src="./Resources/ProfileUser1.png"> 
              <hr> 
              <p class="dueDateText"><strong>DUE:</strong><span>${x.newDueDate}</span></p></div>`;
    const newDiv = document.createElement("div");
    cardsinProgress.insertAdjacentElement("beforeend", newDiv);
    newDiv.classList.add("card1");
    newDiv.addEventListener("click", () => {
      editTask(x), window.scrollTo(0, 0);
    });
    newDiv.innerHTML = card;
      }
    }}