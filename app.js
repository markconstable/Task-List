// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
// DOM Load even
document.addEventListener('DOMContentLoaded', getTasks);
// Add task event
form.addEventListener('submit', addTask);

// Remove task event
taskList.addEventListener('click', removeTask);

// Clear Task Event
clearBtn.addEventListener('click', clearTasks);
// Filter tasks event
filter.addEventListener('keyup', filterTasks);
}
// Get Tasks from LS
function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null){ // Create new array is there isn't one already named 'tasks' in LS
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks')); // If there is one, grab the array
  }
  tasks.forEach(function(task){
    // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // Create text node and append to li
  li.appendChild(document.createTextNode(task));
  // Create new link element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item secondary-content';
  // Add icon html
  link.innerHTML = '<i class="material-icons">clear</i>';
  // Append the link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);

  });
}

// Add Task
function addTask(e) {
  if(taskInput.value === '') {
    alert('Add a task');
  }

  // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item secondary-content';
  // Add icon html
  link.innerHTML = '<i class="material-icons">clear</i>';
  // Append the link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);

  // Store in Local Storage
  storeTaskInLocalStorage(taskInput.value);

  // Clear input
  taskInput.value = '';

  e.preventDefault();
}

// Store task function
function storeTaskInLocalStorage(task){ //task is placeholder, in this case arg is taskInput.value
  let tasks;
  if(localStorage.getItem('tasks') === null){ // Create new array is there isn't one already named 'tasks' in LS
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks')); // If there is one, grab the array
  }
  tasks.push(task); //push task or taskIbput.value onto current 'tasks' array

  localStorage.setItem('tasks', JSON.stringify(tasks)); // update 'tasks' array in local storage
}

//Remove task
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
  if (confirm('Are you sure?')) {
    e.target.parentElement.parentElement.remove();
  }
}
}

function clearTasks(){
  // taskList.innerHTML = ''; this way is slower than while loop


  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild) // jsperf.com/innerhtml-vs-removechild
  }
}

// Filter Tasks
function filterTasks(e){
  const text = e.target.value.toLowerCase(); // e is event object and method target is caught from event listener and then value is value of target

  document.querySelectorAll('.collection-item').forEach // works because is node list
  (function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){ // -1 = no match so not equal to -1 means match
      task.style.display = 'block';
    }else {
      task.style.display = 'none';
    }
  });
}

