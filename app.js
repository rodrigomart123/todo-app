var todos = [];

function loadTodos() {
    var saved = localStorage.getItem('todos');
    if (saved) {
        todos = JSON.parse(saved);
    }
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function addTask(text) {
    var task = {
        id: Date.now(),
        text: text,
        done: false
    };
    todos.push(task);
    saveTodos();
    console.log('Task added: ' + text);
}

function removeTask(id) {
    todos = todos.filter(function(t) {
        return t.id !== id;
    });
    saveTodos();
    console.log('Task removed');
}

function toggleTask(id) {
    for (var i = 0; i < todos.length; i++) {
        if (todos[i].id === id) {
            todos[i].done = !todos[i].done;
            break;
        }
    }
    saveTodos();
    console.log('Task toggled');
}

function showTodos() {
    console.log('--- Your Todos ---');
    for (var i = 0; i < todos.length; i++) {
        var status = todos[i].done ? '[done]' : '[ ]';
        console.log(status + ' ' + todos[i].text);
    }
    console.log('------------------');
}

loadTodos();
console.log('Todo App loaded. Use addTask("text"), removeTask(id), toggleTask(id), showTodos()');
