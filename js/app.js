function app(){
  // selectors
  const addTodo   = document.querySelector('form .add');
  const todoInput = document.querySelector('.todo-input');
  let todoList  = document.querySelector('.todo-list');
  // adding Event Listeners
  addTodo.addEventListener('click',insertTodo);
  document.addEventListener('DOMContentLoaded',function(){
    loadTodos()
  })
  function insertTodo(e){
    e.preventDefault()
    let div = document.createElement('div');
    div.className='todo';
    let todoItem = document.createElement('li');
    todoItem.className='todo-name'
    todoItem.innerHTML = todoInput.value;
    saveToLocalStorage(todoInput.value) // Saving to local storage
    todoInput.value=''
    div.appendChild(todoItem);
    //Creating Check Button
    let check = document.createElement('button')
    check.className='check'
    check.innerHTML='<i class="fa-solid fa-check "></i>'
    div.appendChild(check)
    //Creating trash Button
    let trash = document.createElement('button')
    trash.className='trash'
    trash.innerHTML='<i class="fa-solid fa-trash "></i>'
    div.appendChild(trash)
    //add div to todolist
    todoList.appendChild(div)
    let todos= document.querySelectorAll('.todo-name');
  }
  // ul event listener
  todoList.addEventListener('click',deleteTodo)
  //Delete Todo item
  function deleteTodo(e){
    if(e.target.classList[0]==='trash'){
    e.target.parentElement.remove();
    deleteFromLocalStorage(e.target.parentElement.childNodes[0].textContent);
  }
  // Check Todo item
  if(e.target.classList[0]==='check'){
    e.target.parentElement.classList.toggle('done')
  }
}
// save to local Storage
let todos= JSON.parse(localStorage.getItem('todos')) || [];
function saveToLocalStorage(todo){
  todos.push(todo)
  localStorage.setItem('todos',JSON.stringify(todos))
}
// LOAD TODOS from local storage
function loadTodos(){
  let todos=JSON.parse(localStorage.getItem('todos'));
  for(let i=0;i<todos.length;i++){
    let div = document.createElement('div');
    div.className='todo';
    let todoItem = document.createElement('li');
    todoItem.className='todo-name'
    todoItem.innerHTML=todos[i];
    div.appendChild(todoItem);
    //Creating Check Button
    let check = document.createElement('button')
    check.className='check'
    check.innerHTML='<i class="fa-solid fa-check "></i>'
    div.appendChild(check)
    //Creating trash Button
    let trash = document.createElement('button')
    trash.className='trash'
    trash.innerHTML='<i class="fa-solid fa-trash "></i>'
    div.appendChild(trash)
    //add div to todolist
    todoList.appendChild(div)
  }
}
// Delete TODO FROM LOCAL STORAGE
function deleteFromLocalStorage(todo){
  let todos=JSON.parse(localStorage.getItem('todos'));
  let index = todos.indexOf(todo)
  todos.splice(index,1)
  localStorage.setItem('todos',JSON.stringify(todos))
}
//Filter Todos
let filter = document.querySelector(".filter")
filter.addEventListener('click',filterTodos);
function filterTodos(e){
  const todos= todoList.childNodes;
  todos.forEach(function(todo){
    switch(e.target.value){
      case 'all': todo.style.display='flex';
      break;
      case 'done':
        if(todo.classList.contains('done')){
          todo.style.display='flex';
        }else{
          todo.style.display='none';
        }
        break;
        case"uncompleted":
        if(!todo.classList.contains('done')){
          todo.style.display='flex';
        }else{
          todo.style.display='none';
        }
        break;
    }
  })
}
}
app();

