let tasks = [];

let currentFilter = "all";

const taskInput = document.getElementById("taskInput");
const priority = document.getElementById("priority");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const pendingTasks = document.getElementById("pendingTasks");
const completedTasks = document.getElementById("completedTasks");


// Add Task
addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        addTask();
    }

});


function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    const task = {
        id: Date.now(),
        name: taskText,
        priority: priority.value,
        completed: false
    };

    tasks.push(task);

    taskInput.value = "";

    displayTasks();
}


// Display Tasks
function displayTasks() {

    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if (currentFilter === "pending") {

        filteredTasks = tasks.filter(function(task) {
            return !task.completed;
        });

    }

    if (currentFilter === "completed") {

        filteredTasks = tasks.filter(function(task) {
            return task.completed;
        });

    }


    if (filteredTasks.length === 0) {

        taskList.innerHTML = `
            <div class="empty">
                No tasks found.
            </div>
        `;

        updateStats();
        return;
    }


    filteredTasks.forEach(function(task) {

        const taskElement = document.createElement("div");

        taskElement.className = "task";

        if (task.completed) {
            taskElement.classList.add("completed");
        }


        taskElement.innerHTML = `

            <div class="task-left">

                <input 
                    type="checkbox"
                    ${task.completed ? "checked" : ""}
                    onchange="toggleTask(${task.id})"
                >

                <span class="task-name">
                    ${task.name}
                </span>

            </div>

            <div>

                <span class="priority ${task.priority.toLowerCase()}">
                    ${task.priority}
                </span>

                <button 
                    class="delete-btn"
                    onclick="deleteTask(${task.id})"
                >
                    Delete
                </button>

            </div>

        `;

        taskList.appendChild(taskElement);

    });

    updateStats();
}


// Complete / Uncomplete Task
function toggleTask(id) {

    tasks = tasks.map(function(task) {

        if (task.id === id) {
            task.completed = !task.completed;
        }

        return task;

    });

    displayTasks();
}


// Delete Task
function deleteTask(id) {

    tasks = tasks.filter(function(task) {
        return task.id !== id;
    });

    displayTasks();
}


// Filters
const filterButtons = document.querySelectorAll(".filter");

filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        filterButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        currentFilter = button.dataset.filter;

        displayTasks();

    });

});


// Statistics
function updateStats() {

    const total = tasks.length;

    const completed = tasks.filter(function(task) {
        return task.completed;
    }).length;

    const pending = total - completed;

    totalTasks.textContent = total;
    pendingTasks.textContent = pending;
    completedTasks.textContent = completed;
}


// Initial Display
displayTasks();