//selectors
const todoInput = document.querySelector('.todo-input');
const todobutton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');

//event listeners
todobutton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);


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