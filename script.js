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
    else if (task.status === "In Progress") statusClass = "progress";
    else statusClass = "not-started";

    li.className = statusClass;

    li.innerHTML = `
      <span>${task.text}</span>
      <select data-index="${index}">
        <option ${task.status === "Not Started" ? "selected" : ""}>Not Started</option>
        <option ${task.status === "In Progress" ? "selected" : ""}>In Progress</option>
        <option ${task.status === "Completed" ? "selected" : ""}>Completed</option>
      </select>
    `;

    list.appendChild(li);
  });

  // Add event listeners to dropdowns
  document.querySelectorAll("select").forEach(select => {
    select.addEventListener("change", (e) => {
      const index = e.target.getAttribute("data-index");
      tasks[index].status = e.target.value;
      saveTasks();
      renderTasks();
    });
  });
}

// Add task
document.getElementById("addBtn").addEventListener("click", () => {
  const input = document.getElementById("taskInput");

  if (input.value.trim() === "") return;

  tasks.push({
    text: input.value,
    status: "Not Started"
  });

  input.value = "";
  saveTasks();
  renderTasks();
});

// Press Enter to add
document.getElementById("taskInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    document.getElementById("addBtn").click();
  }
});

renderTasks();
