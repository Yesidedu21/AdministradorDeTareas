import { TaskManager, COMPLETED_STATUS } from "./taskManager.js";
import { validateTaskForm, clearErrors } from "./validation.js";
import { crearTarjetaHTML } from "./taskCard.js";

const taskManager = new TaskManager();

const form = document.getElementById("task-form");
const taskList = document.getElementById("task-list");
const dialog = document.getElementById("task-dialog");
const searchInput = document.getElementById("search-input");
const emptyState = document.getElementById("empty-state");
const noResults = document.getElementById("no-results");

window.taskManager = taskManager;

function abrirFormulario() {
  dialog.showModal();
  document.getElementById("task-name").focus();
}

document.querySelectorAll("[data-open-form]").forEach((boton) => {
  boton.addEventListener("click", abrirFormulario);
});

document.getElementById("close-dialog").addEventListener("click", () => dialog.close());
document.getElementById("cancel-task").addEventListener("click", () => dialog.close());

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

dialog.addEventListener("close", () => {
  form.reset();
  clearErrors();
});

function filtrarTareas() {
  const texto = searchInput.value.trim().toLowerCase();
  const tareas = taskManager.getAllTasks();
  let visibles = 0;

  tareas.forEach((tarea) => {
    const contenido = [tarea.nombre, tarea.descripcion, tarea.asignadoA, tarea.estado]
      .join(" ")
      .toLowerCase();
    const coincide = contenido.includes(texto);

    const tarjeta = taskList.querySelector(`.task-card[data-id="${tarea.id}"]`);
    if (tarjeta) tarjeta.hidden = !coincide;
    if (coincide) visibles++;
  });

  noResults.hidden = !(tareas.length > 0 && visibles === 0);
}

function actualizarVista() {
  emptyState.hidden = taskManager.getAllTasks().length > 0;
  filtrarTareas();
}

searchInput.addEventListener("input", filtrarTareas);

function renderTareas() {
  taskManager.render(taskList, crearTarjetaHTML);
  actualizarVista();
}

function completarTarea(id) {
  const tarea = taskManager.getTaskById(id); 
  if (!tarea || tarea.estado === COMPLETED_STATUS) return;

  taskManager.updateTask(id, COMPLETED_STATUS); 
  renderTareas(); 
}

function eliminarTarea(id) {
  if (!taskManager.deleteTask(id)) return;
  renderTareas();
}

// ---------- Formulario ----------
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

  taskManager.addTask(taskData);
  renderTareas();

  dialog.close();
});

// ---------- Un solo listener para todos los botones de las tarjetas ----------
taskList.addEventListener("click", (event) => {
  const boton = event.target; 
  // Recorrido del DOM: sube desde el botón hasta la tarjeta que lo contiene
  const tarjeta = boton.closest(".task-card");
  if (!tarjeta) return; 

  const id = Number(tarjeta.dataset.id);

  if (boton.classList.contains("btn-update")) {
    completarTarea(id);
  } else if (boton.classList.contains("btn-delete")) {
    eliminarTarea(id);
  }
});

renderTareas();