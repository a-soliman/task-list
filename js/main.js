// DEFINE UI VARS
const form      = document.querySelector('form');
const taskList  = document.querySelector('ul.collection');
const clearBtn  = document.querySelector('.clear-tasks');
const filter    = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// LOAD TASK FROM LOCALSTORAGE
loadTasksFromLocalStorage();

// LOAD ALL EVENT LISTENERS
loadEventListener();

function loadEventListener() {
    // ADD TASK EVENT
    form.addEventListener('submit', addTask);

    // DELETE TASK EVENT
    taskList.addEventListener('click', removeTask);

    // FILTER TASKS EVENT
    filter.addEventListener('keyup', filterTasks);

    // CLEAR TASKS EVENT
    clearBtn.addEventListener('click', clearTasks);
}

// LOAD TASK FROM LOCALSTORAGE
function loadTasksFromLocalStorage() {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    if (!tasks) {
        tasks = [];
    }
    tasks.forEach( ( task )=> {
        createTaskElement(task);
    });
    console.log(tasks)
}

// ADD TASK
function addTask(e) {
    e.preventDefault();
    const value = taskInput.value.trim();

    if ( value.length < 1 ) { return; }
    
    createTaskElement(value);
    clearInputField();
    saveTaskToLocalStorage(value);

}