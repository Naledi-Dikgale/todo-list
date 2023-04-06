import './style.css';
import {
  renderTodo, todoAdder, dragger, todoFilter,
} from './modules/renderer';

let todoList = [];

const addTodo = document.getElementById('add-btn');
const textInput = document.getElementById('todo-input');
// clear selected button
const clearSelected = document.querySelector('.clearChecked');
// reset button
const refresh = document.querySelector('.fresher');

textInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    todoAdder(todoList, textInput, renderTodo, clearSelected);
  }
});
addTodo.addEventListener('click', (event) => {
  event.preventDefault();
  todoAdder(todoList, textInput, renderTodo, clearSelected);
});

clearSelected.addEventListener('click', () => {
  todoList = todoList.filter((element) => element.completed !== true);
  renderTodo(todoList, clearSelected, dragger, todoFilter);
});

refresh.addEventListener('click', () => {
  todoList = [];
  renderTodo(todoList, clearSelected, dragger, todoFilter);
});
window.addEventListener('DOMContentLoaded', () => {
  renderTodo(todoList, clearSelected, dragger, todoFilter);
});
