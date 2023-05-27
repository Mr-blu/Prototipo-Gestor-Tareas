import { Component, OnInit } from '@angular/core';
import { TreeNode } from '../project/project.component';
import { Tarea } from 'src/app/utils/interfaces';
import { PROYECTOS_DATA } from 'src/app/utils/data';
import { NbDialogService, NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { TaskService } from 'src/app/services/task.service';
import { CreateTaskComponent } from '../create-task/create-task.component';

@Component({
  selector: 'app-task-pending',
  templateUrl: './task-pending.component.html',
  styleUrls: ['./task-pending.component.scss']
})
export class TaskPendingComponent implements OnInit {

  public tareas: Tarea[] = [];


  customColumn = 'Nombre';
  defaultColumns = ['Descripción', 'Estado', 'Proyecto', 'FechaInicio', 'FechaFin', 'Acciones'];
  allColumns = [this.customColumn, ...this.defaultColumns];

  dataSource: NbTreeGridDataSource<Tarea>;

  sortColumn: string = '';
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  constructor(
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<Tarea>,
    private dialogService: NbDialogService,
    private taskService: TaskService
  ) {
    this.taskService.changeProjects()
    this.taskService.projectsEmitter.subscribe(data => {
      console.log("EMIT TaskPendingComponent init: ", data);
      let tmp = data
      let tareas: Tarea[] = []
      tmp.forEach(proyecto => {
        if (proyecto.Tareas != null) {
          proyecto.Tareas.forEach(tarea => {
            if (tarea.Estado == 'En curso') {
              tareas.push({ ...tarea, Proyecto: proyecto.Nombre });
            }

          });
        }
      });
      let response = tareas.map(tarea => <TreeNode<Tarea>>{
        data: tarea,
      })

      this.dataSource = this.dataSourceBuilder.create(response);
    })
    //  this.dataSource = this.dataSourceBuilder.create(this.data);
  }

  async ngOnInit() {
    this.taskService.changeProjects()
    await this.taskService.projectsEmitter.subscribe(data => {
      console.log("EMIT TaskPendingComponent init: ", data);
      let tmp = data
      let tareas: Tarea[] = []
      tmp.forEach(proyecto => {
        if (proyecto.Tareas != null) {
          proyecto.Tareas.forEach(tarea => {
            if (tarea.Estado == 'En curso') {
              tareas.push({ ...tarea, Proyecto: proyecto.Nombre });
            }

          });
        }
      });
      let response = tareas.map(tarea => <TreeNode<Tarea>>{
        data: tarea,
      })

      this.dataSource = this.dataSourceBuilder.create(response);
    })

  }


  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }



  private data: TreeNode<Tarea>[] = this.refactorData;



  get refactorData(): TreeNode<Tarea>[] {

    var tareas: Tarea[] = [];
    PROYECTOS_DATA.forEach(proyecto => {
      if (proyecto.Tareas != null) {
        proyecto.Tareas.forEach(tarea => {
          if (tarea.Estado == 'En curso') {
            tareas.push({ ...tarea, Proyecto: proyecto.Nombre });
          }

        });
      }
    });
    return tareas.map(tarea => <TreeNode<Tarea>>{
      data: tarea,
    }
    )
  }



  getStatus(status: string) {
    return status == 'E' ? 'En Proceso' : 'Finalizado';
  }

  getFormatDate(date: Date) {
    return date.toLocaleDateString();
  }

  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }


  createTask() {
    const dialogRef = this.dialogService.open(CreateTaskComponent);
    dialogRef.onClose.subscribe(data => {
      console.log("DIALOG: ", data);
      if (data) {
        this.addTask(data);
      }
    })

  }

  addTask(taskNew: Tarea) {
    this.taskService.addTask(taskNew);
  }

  deleteTask(task: Tarea) {
    this.taskService.deleteTask(task);
  }

  editTask(task: Tarea) {
    this.taskService.changeStatus(task);
  }


}
