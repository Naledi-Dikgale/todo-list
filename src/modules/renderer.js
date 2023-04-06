/* eslint-disable linebreak-style */
const renderTodo = (naledi, clearSelected, dragger, todoFilter) => {
  const list = document.getElementById('todo-list');
  list.innerHTML = '';
  naledi.sort((a, b) => a.index - b.index); // sort tasks by index
  if (naledi.some((element) => element.completed)) {
    clearSelected.disabled = false;
  } else {
    clearSelected.disabled = true;
  }
  naledi.forEach((element, index) => { // map, foreach
    const task = naledi[index];
    const listItem = document.createElement('li');
    const delicon = document.createElement('i');
    // creating the drag button
    const drag = document.createElement('i');
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
    });
    todo.addEventListener('focusout', () => {
      setTimeout(() => {
        delicon.style.display = 'none';
        drag.style.display = 'inline';
      }, 3000);
    });
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => dragger(task, checkbox, todo, naledi, clearSelected));

    // appending checkbox and todo together
    checkTodo.appendChild(checkbox);
    checkTodo.appendChild(todo);
    // creating delete button

    delicon.style.display = 'none';
    delicon.className = 'fa-solid fa-trash';
    delicon.classList.add('delicon');
    delicon.addEventListener('click', () => todoFilter(task, renderTodo, naledi, clearSelected));

    drag.className = 'fa-solid fa-ellipsis-vertical';
    drag.classList.add('drag');
    listItem.appendChild(checkTodo);
    listItem.appendChild(delicon);
    listItem.appendChild(drag);
    list.appendChild(listItem);
  });
};

const dragger = (task, checkbox, todo, todoList, clearSelected) => {
  task.completed = checkbox.checked;
  if (checkbox.checked) {
    todo.style.textDecoration = 'line-through';
  } else {
    todo.style.textDecoration = 'none';
  }
  if (todoList.some((element) => element.completed)) {
    clearSelected.disabled = false;
  } else {
    clearSelected.disabled = true;
  }
};
const todoFilter = (task, func, todoList, clearSelected) => {
  todoList = todoList.filter((element) => element !== task);
  func(todoList, clearSelected, dragger, todoFilter);
};
const todoAdder = (todoList, textInput, func, clearSelected) => {
  if (textInput.value !== '' || null) {
    todoList.push(
      {
        description: textInput.value,
        completed: false,
        index: todoList.length,
      },
    );
    textInput.value = '';
    func(todoList, clearSelected, dragger, todoFilter);
  }
};

export {
  renderTodo, dragger, todoAdder, todoFilter,
};