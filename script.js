document.addEventListener('DOMContentLoaded', () => {
    // Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    
    loadTasks(); // Load tasks from Local Storage when the page loads
    
    // Add task when "Add Task" button is clicked
    addButton.addEventListener('click', addTask);
    
    // Add task when "Enter" key is pressed in the input field
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
    
    // Function to load tasks from Local Storage and display them
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // false indicates not to save to Local Storage
    }
    
    // Function to add a new task
    function addTask(taskText = "") {
        if (!taskText) {
            taskText = taskInput.value.trim(); // Explicitly trim input
        }

        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }
        
        // Check if task already exists
        const existingTasks = Array.from(taskList.children).map(li => li.firstChild.textContent);
        if (existingTasks.includes(taskText)) {
            alert("Task already exists.");
            return;
        }
    
        // Create new task element
        const li = document.createElement('li');
        li.textContent = taskText;
    
        // Create remove button for the task
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn'); // Updated: Using classList.add()
        removeBtn.addEventListener('click', () => {
            removeTask(taskText, li);
        });
    
        // Append remove button to task
        li.appendChild(removeBtn);
    
        // Append task to task list
        taskList.appendChild(li);
    
        // Save task to Local Storage
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    
        // Clear the input field
        taskInput.value = '';
    }
    
    // Function to remove a task
    function removeTask(taskText, taskElement) {
        // Remove task from the DOM
        taskList.removeChild(taskElement);
    
        // Update the tasks array in Local Storage
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }
});
