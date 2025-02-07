document.addEventListener('DOMContentLoaded', () => {
    loadTasks(); // Load tasks from Local Storage when the page loads

    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Attach Event Listeners:

    // Add an event listener to addButton that calls addTask when the button is clicked
    addButton.addEventListener('click', () => {
        addTask();
    });

    // Add an event listener to taskInput for the ‘keypress’ event to allow tasks to be added by pressing the “Enter” key
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

    // Create the addTask Function:

    // Define a function named addTask. This function will be responsible for adding new tasks to the list.
    function addTask(taskText = null, save = true) {
        // Inside addTask, retrieve and trim the value from the task input field. Store this value in a variable named taskText.
        if (taskText === null) {
            taskText = taskInput.value.trim();
        }

        // Check if taskText is not empty (“”)
        if (taskText === "") {
            // If it is empty, use alert to prompt the user to enter a task.
            alert("Please enter a task.");
            return;
        }

        // Task Creation and Removal:

        // Within the addTask function, if taskText is not empty:
        
        // Create a new li element. Set its textContent to taskText.
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a new button element for removing the task
        const removeBtn = document.createElement('button');

        // Set its textContent to “Remove”, and give it a class name of ‘remove-btn’.
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // Assign an onclick event to the remove button that, when triggered, removes the li element from taskList.
        removeBtn.addEventListener('click', () => {
            removeTask(taskText, li);
        });

        // Append the remove button to the li element
        li.appendChild(removeBtn);

        // Append the li to taskList
        taskList.appendChild(li);

        // Save task to Local Storage if required
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }

        // Clear the task input field by setting taskInput.value to an empty string
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
