// Retrieve stored tasks from localStorage or initialize an empty array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let new_task = "";

// Function to handle input field changes
function handleChange(event) {
    // Update new_task with the value from the input field
    new_task = event.target.value;
}

// Function to handle the "Add" button click
function handleClick() {
    // Check if the task is not empty
    if (new_task.trim() !== "") {
        // Add the new task to the task list
        tasks = [...tasks, new_task];
        new_task = ""; // Clear the input field value
        // Save the updated tasks to localStorage
        localStorage.setItem('tasks', JSON.stringify(tasks));
        // Reload the page to update the task list
        location.reload();
    } else {
        // Alert the user if the task input is empty
        alert("Task is empty");
        location.reload();
    }
}

// Function to handle task deletion
function handleDelete(index) {
    // Remove the task at the specified index
    tasks.splice(index, 1);
    // Save the updated tasks to localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
    // Refresh the task list
    getTasks();
}

// Reference to the task list container
let taskList = document.getElementById('task-list');

// Function to display all tasks
function getTasks() {
    // Clear the current task list
    taskList.innerHTML = '';
    // Loop through all tasks and create list items
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'list-element';

        const span = document.createElement('span');
        span.innerText = task; // Set the task text
        span.className = 'text';

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete'; // Set button text
        deleteButton.id = 'delete-button';
        // Add click event to delete the task
        deleteButton.onclick = () => handleDelete(index);

        // Append the task text and delete button to the list item
        li.appendChild(span);
        li.appendChild(deleteButton);

        // Add the list item to the task list
        taskList.appendChild(li);
    });
}

// Initial call to display tasks on page load
getTasks();
