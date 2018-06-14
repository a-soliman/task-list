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