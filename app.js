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

function createApp() {
    var body = document.body;
    body.style.fontFamily = 'Arial, sans-serif';
    body.style.margin = '0';
    body.style.padding = '20px';
    body.style.backgroundColor = '#f5f5f5';

    var title = document.createElement('h1');
    title.textContent = 'My Todos';
    title.style.textAlign = 'center';
    body.appendChild(title);

    var container = document.createElement('div');
    container.style.maxWidth = '500px';
    container.style.margin = '0 auto';

    var inputArea = document.createElement('div');
    inputArea.style.display = 'flex';
    inputArea.style.gap = '10px';
    inputArea.style.marginBottom = '20px';

    var input = document.createElement('input');
    input.type = 'text';
    input.id = 'taskInput';
    input.placeholder = 'Add a new task...';
    input.style.flex = '1';
    input.style.padding = '10px';
    input.style.fontSize = '16px';

    var button = document.createElement('button');
    button.textContent = 'Add';
    button.style.padding = '10px 20px';
    button.style.fontSize = '16px';
    button.style.cursor = 'pointer';

    inputArea.appendChild(input);
    inputArea.appendChild(button);
    container.appendChild(inputArea);

    var list = document.createElement('ul');
    list.id = 'taskList';
    list.style.listStyle = 'none';
    list.style.padding = '0';
    container.appendChild(list);

    body.appendChild(container);

    button.addEventListener('click', function() {
        addTask(input, list);
    });

    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask(input, list);
        }
    });

    renderTodos(list);
}

function addTask(input, list) {
    var text = input.value.trim();
    if (text === '') {
        return;
    }

    var task = {
        id: Date.now(),
        text: text,
        done: false
    };

    todos.push(task);
    saveTodos();
    renderTodos(list);
    input.value = '';
}

function removeTask(id, list) {
    todos = todos.filter(function(t) {
        return t.id !== id;
    });
    saveTodos();
    renderTodos(list);
}

function toggleTask(id, list) {
    for (var i = 0; i < todos.length; i++) {
        if (todos[i].id === id) {
            todos[i].done = !todos[i].done;
            break;
        }
    }
    saveTodos();
    renderTodos(list);
}

function renderTodos(list) {
    list.innerHTML = '';

    for (var i = 0; i < todos.length; i++) {
        var task = todos[i];

        var li = document.createElement('li');
        li.style.backgroundColor = 'white';
        li.style.padding = '10px';
        li.style.marginBottom = '5px';
        li.style.display = 'flex';
        li.style.justifyContent = 'space-between';
        li.style.alignItems = 'center';

        var span = document.createElement('span');
        span.textContent = task.text;
        span.style.cursor = 'pointer';
        span.style.flex = '1';

        if (task.done) {
            span.style.textDecoration = 'line-through';
            span.style.opacity = '0.6';
        }

        var deleteBtn = document.createElement('span');
        deleteBtn.textContent = 'X';
        deleteBtn.style.cursor = 'pointer';
        deleteBtn.style.color = 'red';
        deleteBtn.style.fontWeight = 'bold';
        deleteBtn.style.marginLeft = '10px';

        li.appendChild(span);
        li.appendChild(deleteBtn);
        list.appendChild(li);

        (function(taskId) {
            span.addEventListener('click', function() {
                toggleTask(taskId, list);
            });
            deleteBtn.addEventListener('click', function() {
                removeTask(taskId, list);
            });
        })(task.id);
    }
}

loadTodos();
createApp();
