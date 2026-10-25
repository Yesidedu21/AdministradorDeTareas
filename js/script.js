// js/script.js
// Conecta el formulario, el TaskManager y la pantalla.

import { TaskManager } from "./taskManager.js";
import { validateTaskForm, clearErrors } from "./validation.js";
import { crearTarjetaHTML } from "./taskCard.js";

const taskManager = new TaskManager();

const form = document.getElementById("task-form");
const taskList = document.getElementById("task-list");

// Para probar desde la consola del navegador: taskManager.getAllTasks()
window.taskManager = taskManager;

// Pinta una tarea en pantalla
function renderTarea(tarea) {
  taskList.insertAdjacentHTML("beforeend", crearTarjetaHTML(tarea));
}

// Elimina primero del array y luego de la pantalla
function eliminarTarea(id) {
  const eliminada = taskManager.deleteTask(id);
  if (!eliminada) return; // si no existía en el array, no tocamos el DOM

  taskList.querySelector(`.task-card[data-id="${id}"]`)?.remove();
}

// Evento submit del formulario
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

  const nuevaTarea = taskManager.addTask(taskData);
  renderTarea(nuevaTarea);

  form.reset();
  clearErrors();
});

// Delegación de eventos: UN solo listener en el contenedor atiende los
// botones "Eliminar" de todas las tarjetas, incluidas las que se creen después.
taskList.addEventListener("click", (event) => {
  const boton = event.target.closest(".btn-delete");
  if (!boton) return; // el clic fue en otra parte

  const tarjeta = boton.closest(".task-card");
  const id = Number(tarjeta.dataset.id); // dataset siempre devuelve texto

  eliminarTarea(id);
});