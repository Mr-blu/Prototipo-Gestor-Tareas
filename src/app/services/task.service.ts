import { EventEmitter, Injectable, Output } from '@angular/core';
import { Proyecto, Tarea } from '../utils/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  public projects: Proyecto[] = [];

  @Output() projectsEmitter = new EventEmitter<Proyecto[]>();


  constructor() {
  }

  setProjects(projects: Proyecto[]) {
    this.projects = projects;
    this.changeProjects();

  }

  changeProjects() {
    this.projectsEmitter.emit(this.projects);
  }

  addTask(task: Tarea) {
    this.projects.forEach(proyecto => {
      if (proyecto.Nombre == task.Proyecto) {
        proyecto.Tareas.push(task)
      }
    });
    this.changeProjects()
  }

  updateTask(task: Tarea) {
    console.log("updateTask: ", task);
    let tmp = []
    this.projects.forEach(proyecto => {
        proyecto.Tareas.forEach(tarea => {
          if (tarea.id == task.id) {
            tarea = { ...task, Estado: 'Finalizada' }
            console.log("updateTask: ", tarea);
          }
        });
        tmp.push(proyecto)
    });
    this.setProjects(tmp)
    console.log("updateTask: ", this.projects);
    
    this.changeProjects()
  }

  deleteTask(task: Tarea) {
    this.projects.forEach(proyecto => {
      if (proyecto.Nombre == task.Proyecto) {
        proyecto.Tareas = proyecto.Tareas.filter(tarea => tarea.id != task.id)
      }
    });
    this.changeProjects()
  }

  changeStatus(task: Tarea) {
    this.projects.forEach(proyecto => {
      if (proyecto.Nombre == task.Proyecto) {
        proyecto.Tareas.forEach(tarea => {
          if (tarea.id == task.id) {
            tarea.Estado = task.Estado
          }
        });
      }
    });
    this.changeProjects()
  }
}
