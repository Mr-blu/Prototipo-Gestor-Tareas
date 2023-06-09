import { Component, OnInit } from '@angular/core';
import { NbDialogService, NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { PROYECTOS_DATA } from 'src/app/utils/data';
import { Tarea } from 'src/app/utils/interfaces';
import { TreeNode } from '../project/project.component';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-completed',
  templateUrl: './task-completed.component.html',
  styleUrls: ['./task-completed.component.scss']
})
export class TaskCompletedComponent implements OnInit {


 
  customColumn = 'Nombre';
  defaultColumns = ['Descripción', 'Estado', 'Proyecto', 'FechaInicio', 'FechaFin'];
  allColumns = [this.customColumn, ...this.defaultColumns];

  dataSource: NbTreeGridDataSource<Tarea>;

  sortColumn: string = '';
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  constructor(
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<Tarea>,
    private dialogService: NbDialogService,
    private taskService: TaskService
  ) {
    //this.dataSource = this.dataSourceBuilder.create(this.data);
    this.taskService.changeProjects()
    this.taskService.projectsEmitter.subscribe(data => {
      console.log("EMIT TaskPendingComponent init: ", data);
      let tmp = data
      let tareas: Tarea[] = []
      tmp.forEach(proyecto => {
        if (proyecto.Tareas != null) {
          proyecto.Tareas.forEach(tarea => {
            if (tarea.Estado == 'Finalizada') {
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


  async ngOnInit() {
    this.taskService.changeProjects()
    await this.taskService.projectsEmitter.subscribe(data => {
      console.log("EMIT TaskPendingComponent init: ", data);
      let tmp = data
      let tareas: Tarea[] = []
      tmp.forEach(proyecto => {
        if (proyecto.Tareas != null) {
          proyecto.Tareas.forEach(tarea => {
            if (tarea.Estado == 'Finalizada') {
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
          if (tarea.Estado == 'Finalizada') {
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


  createProject() {
    //  const dialogRef = this.dialogService.open();
  }
}
