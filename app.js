let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");
const counter = document.getElementById("counter");

taskInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") addTask();
});

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function setFilter(type) {
  filter = type;
  render();
}

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  tasks.push({ text, done: false });
  taskInput.value = "";

  render();
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  render();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  render();
}

function render() {
  taskList.innerHTML = "";

  let filtered = tasks;

  if (filter === "active") {
    filtered = tasks.filter(t => !t.done);
  } else if (filter === "done") {
    filtered = tasks.filter(t => t.done);
  }

  filtered.forEach((task, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span class="${task.done ? "done" : ""}" onclick="toggleTask(${index})">
        ${task.text}
      </span>
      <button class="delete" onclick="deleteTask(${index})">X</button>
    `;

    taskList.appendChild(li);
  });

  counter.textContent = `${tasks.filter(t => t.done).length}/${tasks.length} done`;

  save();
}

render();