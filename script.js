let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    let statusClass = "";
    if (task.status === "Completed") statusClass = "completed";
    if (task.status === "In Progress") statusClass = "progress";
    if (task.status === "Not Started") statusClass = "not-started";

    li.className = statusClass;

    li.innerHTML = `
      <span>${task.text}</span>
      <select onchange="updateStatus(${index}, this.value)">
        <option ${task.status === "Not Started" ? "selected" : ""}>Not Started</option>
        <option ${task.status === "In Progress" ? "selected" : ""}>In Progress</option>
        <option ${task.status === "Completed" ? "selected" : ""}>Completed</option>
      </select>
    `;

    list.appendChild(li);
  });
}

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span>${task.text}</span>
      <select onchange="updateStatus(${index}, this.value)">
        <option ${task.status === "Not Started" ? "selected" : ""}>Not Started</option>
        <option ${task.status === "In Progress" ? "selected" : ""}>In Progress</option>
        <option ${task.status === "Completed" ? "selected" : ""}>Completed</option>
      </select>
    `;

    list.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById("taskInput");

  if (!input || input.value.trim() === "") return;

  tasks.push({
    text: input.value,
    status: "Not Started"
  });

  input.value = "";
  saveTasks();
  renderTasks();
}

  input.value = "";
  saveTasks();
  renderTasks();
}

document.getElementById("addBtn").addEventListener("click", addTask);

function updateStatus(index, status) {
  tasks[index].status = status;
  saveTasks();
}

renderTasks();
