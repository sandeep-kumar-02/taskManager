let inputBox = document.querySelector('.inputField input');
let addButton = document.querySelector('.inputField button');
let todoList = document.querySelector('.todoList');
let deleteAll = document.querySelector('.footer button');

// control style of add button
inputBox.onkeyup = () => {
    let userData = inputBox.value;
    if(userData.trim() != 0){
        addButton.classList.add('active');
    }else{
        addButton.classList.remove('active');
    } 
}

showTasks();

// save data in local storage on button click
addButton.onclick = () => {
    
    let userData =  inputBox.value;
    let getLocalStorage = localStorage.getItem('New Task');
    if(getLocalStorage == null){
         taskArray = [];
    }else{
        taskArray = JSON.parse(getLocalStorage);
    }

    taskArray.push(userData);
    localStorage.setItem('New Task',JSON.stringify(taskArray));

    showTasks();
    addButton.classList.remove('active');
}

// get data from local storage and append in content section
function showTasks(){
    let getLocalStorage = localStorage.getItem('New Task');
    if(getLocalStorage == null){
        taskArray = [];
   }else{
       taskArray = JSON.parse(getLocalStorage);
   }

   let pendingTask = document.querySelector('.pendingTask'); 
   pendingTask.textContent = taskArray.length;

   if(taskArray.length >0){
       deleteAll.classList.add("active");
   }else{
    deleteAll.classList.remove("active");
   }

   let newLiTag = "";
   taskArray.forEach((element,index)=>{
    newLiTag += `<li>${element}<span onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
   });

   todoList.innerHTML = newLiTag;
   inputBox.value = "";
}

// delete the task from local storage
function deleteTask(index){
    let getLocalStorage = localStorage.getItem('New Task');
    taskArray = JSON.parse(getLocalStorage);
    taskArray.splice(index,1);

    localStorage.setItem('New Task',JSON.stringify(taskArray));
    showTasks();
}

// delete all data from local storage
deleteAll.onclick =() =>{
    taskArray = [];
    localStorage.setItem('New Task',JSON.stringify(taskArray));
    showTasks();
}




