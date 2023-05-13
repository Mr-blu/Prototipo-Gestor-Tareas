import { Component, OnInit } from '@angular/core';
import { NbDialogService, NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { PROYECTOS_DATA } from 'src/app/utils/data';
import { Tarea } from 'src/app/utils/interfaces';
import { TreeNode } from '../project/project.component';

@Component({
  selector: 'app-task-completed',
  templateUrl: './task-completed.component.html',
  styleUrls: ['./task-completed.component.scss']
})
export class TaskCompletedComponent implements OnInit {


  ngOnInit(): void {
  }
  customColumn = 'Nombre';
  defaultColumns = ['Descripción', 'Estado', 'Proyecto', 'FechaInicio', 'FechaFin'];
  allColumns = [this.customColumn, ...this.defaultColumns];

  dataSource: NbTreeGridDataSource<Tarea>;

  sortColumn: string = '';
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  constructor(
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<Tarea>,
    private dialogService: NbDialogService,
  ) {
    this.dataSource = this.dataSourceBuilder.create(this.data);
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
