// Wait for the DOM to load before executing the script
document.addEventListener('DOMContentLoaded', () => {
    // Select elements from the DOM
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a task to the list
    function addTask() {
        const taskText = taskInput.value.trim(); // Get and trim the input value

        // Check if input is not empty
        if (taskText !== "") {
            // Create new list item <li>
            const taskItem = document.createElement('li');
            taskItem.textContent = taskText;

            // Create remove button
            const removeButton = document.createElement('button');
            removeButton.textContent = "Remove";
            removeButton.classList.add('remove-btn');
            removeButton.onclick = function () {
                taskList.removeChild(taskItem); // Remove the task when clicked
            };

            // Append the remove button to the task item and task item to the list
            taskItem.appendChild(removeButton);
            taskList.appendChild(taskItem);

            // Clear the input field after adding task
            taskInput.value = "";
        } else {
            alert("Please enter a task.");
        }
    }

    // Add task when 'Add Task' button is clicked
    addButton.addEventListener('click', addTask);

    // Add task when Enter key is pressed in the input field
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
