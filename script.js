const taskForm = document.getElementById('task-form');
const tasksContainer = document.getElementById('tasks-container');

let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];

function renderTasks() {
    tasksContainer.innerHTML = '';
    tasks.forEach((task, index) => {
        const card = document.createElement('div');
        card.className = 'task-card'; 
        
        card.innerHTML = `
            <h3>${task.name}</h3>
            <p><strong>Категорія:</strong> ${task.category}</p>
            <p><small>Створено: ${task.time}</small></p> 
            <button onclick="deleteTask(${index})">Видалити</button>
        `; 
        
        tasksContainer.appendChild(card);
    });
}

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('task-name').value;
    const category = document.getElementById('task-category').value;
    
    // Фіксація поточного часу 
    const now = new Date();
    const timeString = now.getHours().toString().padStart(2, '0') + ':' + 
                       now.getMinutes().toString().padStart(2, '0');

    const newTask = {
        name,
        category,
        time: timeString
    };

    tasks.push(newTask);
    saveAndRender();
    taskForm.reset();
});

function deleteTask(index) {
    tasks.splice(index, 1);
    saveAndRender();
}

function saveAndRender() {
    localStorage.setItem('myTasks', JSON.stringify(tasks)); // 
    renderTasks();
}

renderTasks();