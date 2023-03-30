import './style.css';

const todoList = [
  {
    description: 'Buy groceries',
    completed: false,
    index: 0,
  },
  {
    description: 'Do laundry',
    completed: true,
    index: 1,
  },
  {
    description: 'Clean room',
    completed: false,
    index: 2,
  },
];

function renderTodo() {
  const list = document.getElementById('todo-list');
  list.innerHTML = '';
  todoList.sort((a, b) => a.index - b.index); // sort tasks by index

  for (let i = 0; i < todoList.length; i += 1) {
    const task = todoList[i];
    const listItem = document.createElement('li');
    listItem.className = 'list-element';

    // create a checkbox and label for each task
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked;
    });

    const label = document.createElement('todo-list');
    label.className = 'label';
    label.textContent = task.description;

    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    list.appendChild(listItem);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  renderTodo();
});
