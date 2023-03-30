import './style.css';

let todoList = [];

const addTodo = document.getElementById("add-btn");
let textInput = document.getElementById("todo-input");

textInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault()
    todoAdder();
  }
})
addTodo.addEventListener('click', (event) => {
  event.preventDefault();
  todoAdder();

})
const todoAdder = () => {
  if (textInput.value != '' || null) {
    todoList.push(
      {
        description: textInput.value,
        completed: false,
        index: todoList.length,
      }
    )
    textInput.value = '';
    renderTodo();
  }
}
const renderTodo = () => {
  const list = document.getElementById('todo-list');
  list.innerHTML = '';
  todoList.sort((a, b) => a.index - b.index); // sort tasks by index
  todoList.some(element => element.completed) ? clearSelected.disabled = false : clearSelected.disabled = true
  for (let i = 0; i < todoList.length; i += 1) {
    const task = todoList[i];
    const listItem = document.createElement('li');
    listItem.className = 'list-element';

    // create a checkbox and label for each task
    const checkTodo = document.createElement('div');
    checkTodo.className = 'chk-todo';



    const todo = document.createElement('input');
    todo.className = 'todo';
    todo.value = task.description;
    todo.addEventListener('focusin', () => {
      delicon.style.display = 'inline';
      drag.style.display = 'none';
    })
    todo.addEventListener('focusout', () => {
      setTimeout(() => {
        delicon.style.display = 'none';
        drag.style.display = 'inline';
      }, 3000);
    })
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked;
      // checkbox.checked ? todo.style.textDecoration = 'line-through' : todo.style.textDecoration = 'none';
      todoList.some(element => element.completed) ? clearSelected.disabled = false : clearSelected.disabled = true
    });
    // appending checkbox and todo together
    checkTodo.appendChild(checkbox);
    checkTodo.appendChild(todo);

    // creating delete button
    const delicon = document.createElement('i');
    delicon.style.display = 'none';
    delicon.className = 'fa-solid fa-trash';
    delicon.classList.add('delicon')
    delicon.addEventListener('click', () => {
      todoList = todoList.filter(element => element != task);
      renderTodo();
    })

    // creating the drag button
    const drag = document.createElement('i');
    drag.className = 'fa-solid fa-ellipsis-vertical';
    drag.classList.add('drag')
    drag.addEventListener('click', () => {

    })


    listItem.appendChild(checkTodo);
    listItem.appendChild(delicon);
    listItem.appendChild(drag);
    list.appendChild(listItem);

  }
}

// clear selected button
const clearSelected = document.querySelector('.clearChecked');

clearSelected.addEventListener('click', () => {
  todoList = todoList.filter(element => element.completed != true);
  renderTodo();
})

// reset button
const refresh = document.querySelector('.fresher');

refresh.addEventListener('click', () => {
  todoList = [];
  renderTodo();
})
window.addEventListener('DOMContentLoaded', () => {
  renderTodo();
});