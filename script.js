document.addEventListener('DOMContentLoaded', () => {
    // Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    
    // Load tasks from Local Storage when the page loads
    loadTasks(); 
    
    // Attach event listeners
    addButton.addEventListener('click', addTask);
    
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // false prevents re-saving to Local Storage
    }
    
    // Function to add a new task
    function addTask(taskText = "") {
        if (!taskText) {
            taskText = taskInput.value.trim(); // Retrieve and trim input
        }

        if (taskText === "") {
            alert("Please enter a task."); // Alert user if input is empty
            return;
        }

        // Create new task element
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn'); // Using classList.add() as required
        removeBtn.onclick = () => removeTask(taskText, li); // Assign onclick event to remove task

        // Append elements
        li.appendChild(removeBtn);
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
        taskList.removeChild(taskElement);

        // Update the tasks array in Local Storage
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }
});
