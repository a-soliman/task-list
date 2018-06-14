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

// CREATE AN ELEMENT
function createTaskElement(content) {
    const newLi         = document.createElement('li');
    const textContent   = document.createTextNode(content);
    const newLink       = document.createElement('a');
    const newDelIcon    = document.createElement('i');

    newLi.className     = 'collection-item';
    newLink.className   = 'delete-item secondary-content';
    newDelIcon.className= 'fa fa-remove';

    newLink.setAttribute('href', '#');

    newLink.appendChild(newDelIcon);
    newLi.appendChild(textContent);
    newLi.appendChild(newLink);
    taskList.appendChild(newLi);
    return;
}

// SAVE TASK TO LOCALSTORAGE
function saveTaskToLocalStorage(content) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(content);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// CLEAR INPUT FILED
function clearInputField() {
    taskInput.value = '';
    return;
}

// REMOVE TASK
function removeTask(e) {
    if ( !e.target.classList.contains('fa-remove')) { return; }

    const task = e.target.parentElement.parentElement;
    removeTaskFromLocalStorage(task.textContent);
    task.remove();
    return;
}

// REMOVE TASK FROM LOCALSTORAGE
function removeTaskFromLocalStorage(content) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks.length > 0) {
        tasks = tasks.filter((task) => {
            return task !== content;
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

// FILTER TASKS
function filterTasks(e) {
    const filterQuery = filter.value.toLowerCase().trim();
    const tasks = Array.from(taskList.children);

    tasks.forEach( ( task ) => {
        if ( !task.textContent.roLowerCase().includes(filterQuery)) {
            task.style.display = 'none';
        }
        else {
            task.style.display = 'block';
        }
    });
}

// CLEAR TASKS
function clearTasks() {
    while (taskList.firstChild) {
        taskList.firstChild.remove();
    }
    localStorage.removeItem('tasks');
    return;
}