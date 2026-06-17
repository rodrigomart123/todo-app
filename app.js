var taskInput = document.getElementById('taskInput');
var addButton = document.getElementById('addButton');
var taskList = document.getElementById('taskList');

function addTask() {
    var taskText = taskInput.value.trim();
    
    if (taskText === '') {
        return;
    }
    
    var li = document.createElement('li');
    li.textContent = taskText;
    
    var deleteBtn = document.createElement('span');
    deleteBtn.textContent = 'X';
    deleteBtn.className = 'delete-btn';
    
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
    
    taskInput.value = '';
}

addButton.addEventListener('click', addTask);

taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

taskList.addEventListener('click', function(e) {
    if (e.target.className === 'delete-btn') {
        var li = e.target.parentElement;
        taskList.removeChild(li);
    }
});
