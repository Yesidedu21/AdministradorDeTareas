
export const TASK_STATUSES = ["POR HACER", "EN PROCESO", "REVISIÓN", "HECHO"];

export const COMPLETED_STATUS = "HECHO";

const STORAGE_KEY_TASKS = "planificador:tasks";
const STORAGE_KEY_ID = "planificador:currentId";

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
    contenedor.innerHTML = "";

    this.tasks.forEach((task) => {
      contenedor.insertAdjacentHTML("beforeend", crearTarjeta(task));
    });
  }

 
  save() {
    try {
      localStorage.setItem(STORAGE_KEY_TASKS, JSON.stringify(this.tasks));
      localStorage.setItem(STORAGE_KEY_ID, String(this.currentId));
    } catch (error) {
      console.error("No se pudieron guardar las tareas:", error);
    }
  }

  load() {
    try {
      const savedTasks = localStorage.getItem(STORAGE_KEY_TASKS);
      if (savedTasks === null) return; 
      const parsed = JSON.parse(savedTasks); 
      if (!Array.isArray(parsed)) return;

      this.tasks = parsed.filter((task) => task && Number.isInteger(task.id));

      const savedId = Number(localStorage.getItem(STORAGE_KEY_ID));
      const maxIdEnTareas = this.tasks.reduce((max, task) => Math.max(max, task.id), 0);

      this.currentId = Math.max(Number.isInteger(savedId) ? savedId : 0, maxIdEnTareas);
    } catch (error) {
      console.error("No se pudieron cargar las tareas, se inicia vacío:", error);
      this.tasks = [];
      this.currentId = 0;
    }
  }
}