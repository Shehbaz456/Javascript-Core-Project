let todos = JSON.parse(localStorage.getItem('todos')) || [];
let editTodoId = null;

function addOrUpdateTodo() {
    const todoInput = document.getElementById('todo-input');
    const todoText = todoInput.value.trim();
    const todoButton = document.getElementById('todo-button');

    if (todoText === '') return;

    if (editTodoId) {
        todos = todos.map(todo =>
            todo.id === editTodoId ? { ...todo, text: todoText } : todo
        );
        editTodoId = null;
        todoButton.textContent = 'Add Task';
    } else {
        const todo = {
            id: Date.now(),
            text: todoText,
            completed: false,
            color: getRandomColor()
        };
        todos.push(todo);
    }

    todoInput.value = '';
    saveAndRenderTodos();
}

function saveAndRenderTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos();
}

function renderTodos() {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = 'flex justify-between items-center p-2 rounded shadow-sm todo-item';
        li.style.backgroundColor = todo.color;

        const span = document.createElement('span');
        span.className = 'flex-1 truncate'; // Ensure text does not overflow
        span.textContent = todo.text;

        if (todo.completed) {
            span.classList.add('line-through', 'text-gray-500');
        }

        const editIcon = document.createElement('i');
        editIcon.className = 'fas fa-edit text-blue-500 cursor-pointer mr-4';
        editIcon.onclick = () => editTodo(todo.id, todo.text);

        const deleteIcon = document.createElement('i');
        deleteIcon.className = 'fas fa-trash text-red-500 cursor-pointer';
        deleteIcon.onclick = () => deleteTodo(todo.id);

        const completeBtn = document.createElement('button');
        completeBtn.textContent = todo.completed ? 'Undo' : 'Complete';
        completeBtn.className = `ml-4 px-3 py-1 text-sm ${todo.completed ? 'bg-yellow-500' : 'bg-green-500'} text-white rounded`;
        completeBtn.onclick = () => toggleComplete(todo.id);

        li.append(span, editIcon, deleteIcon, completeBtn);
        todoList.appendChild(li);
    });
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveAndRenderTodos();
}

function toggleComplete(id) {
    todos = todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    saveAndRenderTodos();
}

function editTodo(id, text) {
    document.getElementById('todo-input').value = text;
    document.getElementById('todo-button').textContent = 'Edit Task';
    editTodoId = id;
}

function getRandomColor() {
    const colors = ['#FFB6C1', '#FF7F50', '#FFD700', '#90EE90', '#ADD8E6', '#D3D3D3', '#FF69B4'];
    return colors[Math.floor(Math.random() * colors.length)];
}

document.addEventListener('DOMContentLoaded', () => {
    renderTodos();
});
