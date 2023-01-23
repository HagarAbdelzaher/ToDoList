var todoForm = document.getElementById('form');
var todoInput = document.getElementById('taskInput');
var unfinishedTasksList = document.getElementById("unfinishedTasks");
var finishedTasksList = document.getElementById("finishedTasks");

let unfinished = [];
let finished = [];
//  task{
//     id: Date.now()
//     name: "buy milk"
//     completed: false
// }

todoForm.addEventListener("submit" , function(e){
e.preventDefault();  // preventing reload action
addNewTask(todoInput.value);
});

function addNewTask(task){
    if(task!=="")
    {
        const newTask = {
            id:Date.now(),
            name:task,
            finished:false,
        }
        unfinished.push(newTask);
        addToLocalStorage(unfinished , finished);
    }
    todoInput.value=" ";
}

function addToLocalStorage(unfinished , finished){
localStorage.setItem('unfinished' , JSON.stringify(unfinished));
localStorage.setItem('finished' , JSON.stringify(finished))

renderTasks(unfinished);
// renderTasks(finished);
}

function getFromLocalStorage(){
    const reference1 = localStorage.getItem("unfinished");
    const reference2 = localStorage.getItem("finished");
    if(reference1)
    {
        unfinished = JSON.parse(reference1);
        renderTasks(unfinished);
    }
    if(reference2)
    {
        finished = JSON.parse(reference2);
    }
}
function renderTasks(unfinished){
    unfinishedTasksList.innerHTML="";
    finishedTasksList.innerHTML="";
    unfinished.forEach(
        function(task){
        let checked;
        if(task.finished)
        {
            checked="checked";
        }
        else 
        {
            checked=null;
        }
        const li = document.createElement('li');
        li.setAttribute("class" , "todo");
        li.setAttribute("data-key" , task.id);
        li.innerHTML=`
        <div class = "task">
        <input class = "checkbox" type="checkbox" ${checked}>
        ${task.name}
        <button class="deleteButton">X</button>
        <button class="editButton"><i class="fa-solid fa-pen"></i></button>
        `
        if(task.finished===true)
        {
            li.setAttribute("class" , "done");
            finishedTasksList.append(li);
           
        }
        else
        {
            unfinishedTasksList.append(li);
        }
    });
}


unfinishedTasksList.addEventListener("click" , deleteToggle);
finishedTasksList.addEventListener("click" , deleteToggle);

function deleteToggle(e){
if(e.target.type==="checkbox"){
    toggle(e.target.parentElement.parentElement.getAttribute("data-key"));
   // console.log(e.target.parentElement.parentElement);
}
if(e.target.classList.contains("deleteButton")){
    deleteTodo(e.target.parentElement.parentElement.getAttribute("data-key"));
}
if(e.target.classList.contains("editButton")){
    editTodo(e.target.parentElement.parentElement.getAttribute("data-key"));
    deleteTodo(e.target.parentElement.parentElement.getAttribute("data-key"));
}
}

function toggle(id)
{
    unfinished.forEach(function(item){
        if(item.id==id)
        {
            item.finished = !item.finished;
            finished.push(item);
        }
    });
    addToLocalStorage(unfinished , finished);
}
function deleteTodo(id)
{
    unfinished = unfinished.filter(function(item){
        return item.id!=id;
    
    });

    finished = finished.filter(function(item){
        return item.id!=id;
    
    });
    addToLocalStorage(unfinished , finished);

}
function editTodo(id){
    unfinished.forEach(function(item){
        if(item.id==id)
        {
            todoInput.value =`${item.name}`;
        }
    });
    finished.forEach(function(item){
        if(item.id==id)
        {
            todoInput.value =`${item.name}`;
        }
    });
    addToLocalStorage(unfinished , finished);
}
getFromLocalStorage();
