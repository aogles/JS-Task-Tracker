// === Select DOM elements ===
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// === Load tasks from localStorage or start empty ===
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// === Function to save tasks to localStorage ===
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// === Function to render all tasks ===
function renderTasks() {
  taskList.innerHTML = ""; // Clear list

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    // Task text element
    const span = document.createElement("span");
    span.textContent = task.text;
    if (task.completed) {
      span.classList.add("completed");
    }
    span.addEventListener("click", () => toggleDone(index));
    li.appendChild(span);

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.addEventListener("click", () => deleteTask(index));
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });
}

// === Function to add a new task ===
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  tasks.push({ text: taskText, completed: false });
  taskInput.value = "";
  saveTasks();
  renderTasks();
}

// === Function to delete a task ===
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// === Function to toggle task completion ===
function toggleDone(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

// === Event listeners ===
addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

// === Initial render on page load ===
renderTasks();
