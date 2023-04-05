/**
 * @jest-environment jsdom
 */
import { todoAdder } from "./todolist";

describe("todoAdder", () => {
        document.body.innerHTML = `
        <body>
    <div class="container">
        <header>
        <div class="header">
            <h2>Today's To Do</h2><span><i class="fa fa-refresh fresher" aria-hidden="true"></i></span>
        </div>
        <div class="add-todo">
            <form id="todo-form">
            <input type="text" name="todo-input" id="todo-input" placeholder="Add your list ..." />
            <button type="submit">
                <button class="add-btn" id="add-btn">&#8617</button>
            </button>
            </form>
        </div>
        </header>

        <ul id="todo-list">
        <li class="todo">
            <i 
            class="bi bi-circle"
            data-action="check"
            ></i>
            <p class="" data-action="check">todo one</p>
            
            <i class="bi bi-trash" data-action="delete"></i>
        </li>
        </ul>

        <button class="clearChecked">Clear All Completed</button>

    </div>
    </body>`;

    test('todoAdder', () => {
        const textInput = document.getElementById('todo-input');
        textInput.value = 'test';
        todoAdder();
        expect(textInput.value).toBe('test');
    });
});