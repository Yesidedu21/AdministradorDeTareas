
import { TASK_STATUSES } from "./taskManager.js";


function validateMinLength(value, label, min, errors) {
  if (value === "") {
    errors.push(`${label} es obligatorio.`);
  } else if (value.length <= min) {
    errors.push(
      `${label} debe tener más de ${min} caracteres (ahora tiene ${value.length}).`
    );
  }
}

function showErrors(errors) {
  const container = document.getElementById("form-errors");
  container.innerHTML = ""; 

  if (errors.length === 0) {
    container.hidden = true;
    return;
  }

  const list = document.createElement("ul");
  errors.forEach((message) => {
    const item = document.createElement("li");
    item.textContent = message;
    list.append(item);
  });

  container.append(list);
  container.hidden = false;
}

export function clearErrors() {
  showErrors([]);
}


export function validateTaskForm() {
  const nombre = document.getElementById("task-name").value.trim();
  const descripcion = document.getElementById("task-desc").value.trim();
  const asignadoA = document.getElementById("task-assigned").value.trim();
  const fecha = document.getElementById("task-date").value.trim();
  const estado = document.getElementById("task-status").value;

  const errors = [];

  validateMinLength(nombre, "El nombre", 8, errors);
  validateMinLength(descripcion, "La descripción", 15, errors);
  validateMinLength(asignadoA, "El campo 'Asignado A'", 8, errors);

  if (fecha === "") {
    errors.push("La fecha de entrega es obligatoria.");
  }

  if (!TASK_STATUSES.includes(estado)) {
    errors.push("Debes seleccionar un estado para la tarea.");
  }

  showErrors(errors);
  return errors.length === 0;
}