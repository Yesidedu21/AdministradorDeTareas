
export const TASK_STATUSES = ["POR HACER", "EN PROCESO", "REVISIÓN", "HECHO"];

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
    const task = this.tasks.find((t) => t.id === taskId);
    if (!task) return false;
    task.estado = status;
    return true;
  }

  
  assignTask(taskId, assignee) {
    const task = this.tasks.find((t) => t.id === taskId);
    if (!task) return false;
    task.asignadoA = assignee;
    return true;
  }
}