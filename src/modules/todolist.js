import {
  addTodo, textInput, clearSelected, refresh,
} from './variables';

const todoListFunc = () => {
  let todoList = JSON.parse(localStorage.getItem('todoList')) || [];

  const renderTodo = () => {
    const list = document.getElementById('todo-list');

    list.innerHTML = '';
    todoList.sort((a, b) => a.index - b.index); // sort tasks by index

    const handleDelete = (task) => {
      todoList = todoList.filter((element) => element !== task);
      localStorage.setItem('todoList', JSON.stringify(todoList));
      renderTodo();
    };

    for (let i = 0; i < todoList.length; i += 1) {
      const task = todoList[i];
      const drag = document.createElement('i');
      const delicon = document.createElement('i');
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
      checkbox.addEventListener('change', () => {
        task.completed = checkbox.checked;
      });
      // appending checkbox and todo together
      checkTodo.appendChild(checkbox);
      checkTodo.appendChild(todo);

      // creating delete button
      delicon.style.display = 'none';
      delicon.className = 'fa-solid fa-trash';
      delicon.classList.add('delicon');
      delicon.addEventListener('click', () => handleDelete(task));

      // creating the drag button
      drag.className = 'fa-solid fa-ellipsis-vertical';
      drag.classList.add('drag');
      drag.addEventListener('click', () => {

      });

      listItem.appendChild(checkTodo);
      listItem.appendChild(delicon);
      listItem.appendChild(drag);
      list.appendChild(listItem);
    }
  };

  const todoAdder = () => {
    if (textInput.value !== '' || null) {
      todoList.push(
        {
          description: textInput.value,
          completed: false,
          index: todoList.length,
        },
      );
      localStorage.setItem('todoList', JSON.stringify(todoList));
      textInput.value = '';
      renderTodo();
    }
  };

  textInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      todoAdder();
    }
  });
  addTodo.addEventListener('click', (event) => {
    event.preventDefault();
    todoAdder();
  });

  clearSelected.addEventListener('click', () => {
    todoList = todoList.filter((element) => element.completed !== true);
    localStorage.setItem('todoList', JSON.stringify(todoList));
    renderTodo();
  });

  const refreshFunction = () => {
    refresh.addEventListener('click', () => {
      todoList = [];
      renderTodo();
    });
  };
  refreshFunction();
  window.addEventListener('DOMContentLoaded', () => {
    renderTodo();
  });
};

export default todoListFunc;