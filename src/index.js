// SELECT ELEMENTS
const form = document.getElementById('todo-form');
const todoTextInput = document.getElementById('todo-input');
const todoListUl = document.getElementById('todo-list');
const notificationEl = document.querySelector('.notification');
// VARS
let allTodos = JSON.parse(localStorage.getItem('todos')) || [];
let TodoEditId = -1;

// 1st render
displayTodos();

// FORM SUBMIT
form.addEventListener('submit', function (event) {
  event.preventDefault();

  TodoSaver();
  displayTodos();
  localStorage.setItem('todos', JSON.stringify(allTodos));
});

// SAVE TODO
function TodoSaver() {
  const todoTextVal = todoTextInput.value;

  // check if the todo is empty
  const isEmpty = todoTextVal === '';

  // check for duplicate todos
  const isDuplicate = allTodos.some((todo) => todo.value.toUpperCase() === todoTextVal.toUpperCase());

  if (isEmpty) {
    showToastNotification("Todo's input is empty");
  } else if (isDuplicate) {
    showToastNotification('Todo already exists!');
  } else {
    if (TodoEditId >= 0) {
      allTodos = allTodos.map((todo, index) => ({
        ...todo,
        value: index === TodoEditId ? todoTextVal : todo.value,
      }));
      TodoEditId = -1;
    } else {
      allTodos.push({
        value: todoTextVal,
        checked: false,
        color: '#' + Math.floor(Math.random() * 16777215).toString(16),
      });
    }

    todoTextInput.value = '';
  }
}




// RENDER TODOS
function displayTodos() {
  if (allTodos.length === 0) {
    todoListUl.innerHTML = '<center>Nothing to do!</center>';
    return;
  }

  // CLEAR ELEMENT BEFORE A RE-RENDER
  todoListUl.innerHTML = '';

  // RENDER TODOS
  allTodos.forEach((todo, index) => {
    todoListUl.innerHTML += `
    <div class="todo" id=${index}>
      <i 
        class="bi ${todo.checked ? 'bi-check-circle-fill' : 'bi-circle'} chk"
        style="color : ${todo.color}"
        data-action="check"
      ></i>
      <p class="${todo.checked ? 'checked' : ''}" data-action="check">${todo.value}</p>
      <i class="bi bi-pencil-square" data-action="edit"></i>
      <i class="bi bi-trash" data-action="delete"></i>
    </div>
    `;
  });
}

// CLICK EVENT LISTENER FOR ALL THE TODOS
todoListUl.addEventListener('click', (event) => {
  const target = event.target;
  const parentElement = target.parentNode;

  if (parentElement.className !== 'todo') return;

  // todo id
  const todo = parentElement;
  const todoId = Number(todo.id);

  // target action
  const action = target.dataset.action;

  action === 'check' && checkTodo(todoId);
  action === 'edit' && editTodo(todoId);
  action === 'delete' && deleteTodo(todoId);
});



// CHECK A TODO
const checkTodo = (todoId) => {
  allTodos = allTodos.map((todo, index) => ({
    ...todo,
    checked: index === todoId ? !todo.checked : todo.checked,
  }));

  displayTodos();
  localStorage.setItem('todos', JSON.stringify(allTodos));
}

// EDIT A TODO
const editTodo = (todoId)  => {
  todoTextInput.value = allTodos[todoId].value;
  TodoEditId = todoId;
}

// DELETE TODO
function deleteTodo(todoId) {
  allTodos = allTodos.filter((todo, index) => index !== todoId);
  TodoEditId = -1;

  // re-render
  displayTodos();
  localStorage.setItem('todos', JSON.stringify(allTodos));
}

// SHOW A NOTIFICATION
function showToastNotification(msg) {
  // change the message
  notificationEl.innerHTML = msg;

  // notification enter
  notificationEl.classList.add('notif-enter');

  // notification leave
  setTimeout(() => {
    notificationEl.classList.remove('notif-enter');
  }, 2000);
}
