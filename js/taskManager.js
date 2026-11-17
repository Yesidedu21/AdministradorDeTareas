export const TASK_STATUSES = ["POR HACER", "EN PROCESO", "REVISIÓN", "HECHO"];

export const COMPLETED_STATUS = "HECHO";

export class TaskManager {
  constructor() {
    this.tasks = [];
    this.currentId = 0;
  }

  getAllTasks() {
    return [...this.tasks];
  }

  getTasksWithStatus(status) {
    return this.tasks.filter((task) => task.estado === status);
  }


  getTaskById(taskId) {
    return this.tasks.find((task) => task.id === taskId);
  }

  addTask({
    nombre,
    descripcion,
    asignadoA,
    fechaDeEntrega,
    estado,
    prioridad = "",
    enlace = "",
  }) {
    this.currentId++;

    const task = {
      id: this.currentId,
      nombre,
      descripcion,
      asignadoA,
      fechaDeEntrega,
      estado,
      prioridad,
      enlace,
    };

    this.tasks.push(task);
    return task;
  }

  deleteTask(taskId) {
    const cantidadAntes = this.tasks.length;
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    return this.tasks.length < cantidadAntes;
  }

  updateTask(taskId, status) {
    const task = this.getTaskById(taskId);
    if (!task) return false;
    task.estado = status;
    return true;
  }

  assignTask(taskId, assignee) {
    const task = this.getTaskById(taskId);
    if (!task) return false;
    task.asignadoA = assignee;
    return true;
  }

  render(contenedor, crearTarjeta) {
    contenedor.innerHTML = ""; // 1) limpia, para no duplicar tarjetas

    this.tasks.forEach((task) => {
      contenedor.insertAdjacentHTML("beforeend", crearTarjeta(task));
    });
  }
}