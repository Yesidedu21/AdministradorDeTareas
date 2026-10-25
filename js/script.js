
import { TaskManager } from "./taskManager.js";
import { validateTaskForm, clearErrors } from "./validation.js";

const taskManager = new TaskManager();

const form = document.getElementById("task-form");
const taskList = document.getElementById("task-list");

window.taskManager = taskManager;

function createInfoRow(label, value) {
  const p = document.createElement("p");
  p.className = "task-card__info";

  const strong = document.createElement("strong");
  strong.textContent = `${label}: `;

  p.append(strong, value); 
  return p;
}

function createTaskCard(task) {
  const card = document.createElement("article");
  card.className = "task-card";
  card.dataset.id = task.id;

  const title = document.createElement("h3");
  title.className = "task-card__title";
  title.textContent = task.nombre;

  const description = document.createElement("p");
  description.className = "task-card__description";
  description.textContent = task.descripcion;

  card.append(
    title,
    description,
    createInfoRow("Asignado a", task.asignadoA),
    createInfoRow("Fecha de entrega", task.fechaDeEntrega),
    createInfoRow("Estado", task.estado)
  );


  if (task.prioridad) {
    card.append(createInfoRow("Prioridad", task.prioridad));
  }
  if (task.enlace) {
    const link = document.createElement("a");
    link.href = task.enlace;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = task.enlace;

    const p = document.createElement("p");
    p.className = "task-card__info";
    const strong = document.createElement("strong");
    strong.textContent = "Enlace: ";
    p.append(strong, link);
    card.append(p);
  }

  
  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.className = "btn btn-danger";
  deleteBtn.textContent = "Eliminar";

  deleteBtn.addEventListener("click", () => {
    taskManager.deleteTask(task.id); // 1) borra del array
    card.remove(); // 2) borra del DOM
  });

  card.append(deleteBtn);
  return card;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!validateTaskForm()) return;

  const taskData = {
    nombre: document.getElementById("task-name").value.trim(),
    descripcion: document.getElementById("task-desc").value.trim(),
    asignadoA: document.getElementById("task-assigned").value.trim(),
    fechaDeEntrega: document.getElementById("task-date").value,
    estado: document.getElementById("task-status").value,
    prioridad: document.getElementById("task-priority").value,
    enlace: document.getElementById("task-url").value.trim(),
  };

  const newTask = taskManager.addTask(taskData);
  taskList.append(createTaskCard(newTask));

  form.reset();
  clearErrors();
});