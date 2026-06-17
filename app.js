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

function buildPage() {
    var body = document.body;
    body.style.margin = '0';
    body.style.padding = '0';
    body.style.minHeight = '100vh';
    body.style.display = 'flex';
    body.style.justifyContent = 'center';
    body.style.alignItems = 'flex-start';
    body.style.paddingTop = '50px';
    body.style.backgroundColor = '#e8e8e8';

    var app = document.createElement('div');
    app.style.width = '400px';
    app.style.backgroundColor = 'white';
    app.style.borderRadius = '8px';
    app.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    app.style.padding = '30px';
    app.style.fontFamily = 'Arial, sans-serif';

    var heading = document.createElement('h2');
    heading.textContent = 'My Tasks';
    heading.style.margin = '0 0 20px 0';
    heading.style.fontSize = '24px';
    heading.style.fontWeight = 'normal';
    heading.style.color = '#333';
    app.appendChild(heading);

    var form = document.createElement('div');
    form.style.display = 'flex';
    form.style.marginBottom = '25px';

    var input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'What needs to be done?';
    input.style.flex = '1';
    input.style.padding = '12px';
    input.style.border = '1px solid #ddd';
    input.style.borderRadius = '4px 0 0 4px';
    input.style.fontSize = '14px';
    input.style.outline = 'none';

    var btn = document.createElement('button');
    btn.textContent = '+';
    btn.style.padding = '12px 18px';
    btn.style.backgroundColor = '#4a90d9';
    btn.style.color = 'white';
    btn.style.border = 'none';
    btn.style.borderRadius = '0 4px 4px 0';
    btn.style.cursor = 'pointer';
    btn.style.fontSize = '18px';

    form.appendChild(input);
    form.appendChild(btn);
    app.appendChild(form);

    var list = document.createElement('div');
    list.id = 'taskList';
    app.appendChild(list);

    body.appendChild(app);

    btn.addEventListener('click', function() {
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
    if (text === '') return;

    todos.push({
        id: Date.now(),
        text: text,
        done: false
    });
    saveTodos();
    renderTodos(list);
    input.value = '';
}

function removeTask(id, list) {
    todos = todos.filter(function(t) { return t.id !== id; });
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
        var item = document.createElement('div');
        item.style.display = 'flex';
        item.style.alignItems = 'center';
        item.style.padding = '12px';
        item.style.borderBottom = '1px solid #eee';

        var checkbox = document.createElement('span');
        checkbox.textContent = task.done ? '☑' : '☐';
        checkbox.style.cursor = 'pointer';
        checkbox.style.marginRight = '12px';
        checkbox.style.fontSize = '18px';
        checkbox.style.color = task.done ? '#4a90d9' : '#999';

        var text = document.createElement('span');
        text.textContent = task.text;
        text.style.flex = '1';
        text.style.fontSize = '14px';
        text.style.color = task.done ? '#999' : '#333';
        if (task.done) text.style.textDecoration = 'line-through';

        var del = document.createElement('span');
        del.textContent = '×';
        del.style.cursor = 'pointer';
        del.style.color = '#ccc';
        del.style.fontSize = '18px';

        item.appendChild(checkbox);
        item.appendChild(text);
        item.appendChild(del);
        list.appendChild(item);

        (function(id) {
            checkbox.addEventListener('click', function() { toggleTask(id, list); });
            text.addEventListener('click', function() { toggleTask(id, list); });
            del.addEventListener('click', function() { removeTask(id, list); });
        })(task.id);
    }
}

loadTodos();
buildPage();
