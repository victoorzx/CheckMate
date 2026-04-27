const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const errorMessage = document.getElementById('errorMessage');
const emptyState = document.getElementById('emptyState');
const pendingCount = document.getElementById('pendingCount');
const completedCount = document.getElementById('completedCount');

function updateInterface() {
    const totalTasks = taskList.children.length;
    const completedTasks = taskList.querySelectorAll('.completed').length;
    const pendingTasks = totalTasks - completedTasks;

    pendingCount.textContent = pendingTasks;
    completedCount.textContent = completedTasks;

    if (totalTasks === 0) {
        emptyState.style.display = 'block';
    } else {
        emptyState.style.display = 'none';
    }
}

taskForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const taskTextValue = taskInput.value.trim();

    if (taskTextValue === "") {
        errorMessage.style.display = 'block';
        return;
    }

    errorMessage.style.display = 'none';

    const li = document.createElement('li');

    const taskSpan = document.createElement('span');
    taskSpan.className = 'task-text';
    taskSpan.textContent = taskTextValue;

    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'task-actions';

    const completeBtn = document.createElement('button');
    completeBtn.className = 'complete-btn';
    completeBtn.textContent = '✓';

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'X';

    actionsDiv.appendChild(completeBtn);
    actionsDiv.appendChild(deleteBtn);

    li.appendChild(taskSpan);
    li.appendChild(actionsDiv);

    taskSpan.addEventListener('click', function() {
        li.classList.toggle('completed');
        updateInterface();
    });

    completeBtn.addEventListener('click', function(event) {
        event.stopPropagation();
        li.classList.toggle('completed');
        updateInterface();
    });

    deleteBtn.addEventListener('click', function(event) {
        event.stopPropagation();
        li.remove();
        updateInterface();
    });

    taskList.appendChild(li);
    
    taskInput.value = "";
    updateInterface();
});