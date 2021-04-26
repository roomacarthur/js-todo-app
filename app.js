//selectors
const todoInput = document.querySelector('.todo-input');
const todobutton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//event listeners
document.addEventListener('DOMContentLoaded', getTodos);
todobutton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//Functions
function addTodo(event) {
  //prevent form from submitting.
  event.preventDefault();
  //todo DIV
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');
  //create LI
  const newTodo = document.createElement('li');
  newTodo.innerText = todoInput.value;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);
  //Add todo to local storage
  saveLocalTodos(todoInput.value);
  //Completed button
  const completedButton = document.createElement('button');
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  //delete button
  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
  deleteButton.classList.add("delete-btn");
  todoDiv.appendChild(deleteButton);
  //append to list
  todoList.appendChild(todoDiv);
  //clear input value after submit.
  todoInput.value = "";
}
//Delete check
function deleteCheck(e){
  const item = e.target;
  //delete todo
  if(item.classList[0] === 'delete-btn') {
    const todo = item.parentElement;
    //animation
    todo.classList.add('fall');
    removeLocaltodos(todo);
    todo.addEventListener('transitionend', function(){
      todo.remove();
    });

  }
  //Completed button.
  if(item.classList[0] === 'complete-btn') {
    const todo = item.parentElement;
    todo.classList.toggle('completed');
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function(todo){
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if(todo.classList.contains("completed")){
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if(!todo.classList.contains("completed")){
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo){
  //check do i already have todos saved?
  let todos;
  if(localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
  let todos;
  if(localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach(function(todo){
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //Completed button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);
    //append to list
    todoList.appendChild(todoDiv);
  })
}

function removeLocaltodos(todo){
  let todos;
  if(localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

