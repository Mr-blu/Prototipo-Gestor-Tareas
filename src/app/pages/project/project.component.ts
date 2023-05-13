import { Component, OnInit } from '@angular/core';
import { NbDialogService, NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { CreateProjectComponent } from '../create-project/create-project.component';
import { Proyecto } from 'src/app/utils/interfaces';
import { PROYECTOS_DATA } from 'src/app/utils/data';

export interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {


  ngOnInit(): void {
  }
  customColumn = 'Nombre';
  defaultColumns = ['Descripción', 'Estado', 'FechaInicio', 'FechaFin'];
  allColumns = [this.customColumn, ...this.defaultColumns];

  dataSource: NbTreeGridDataSource<Proyecto>;

  sortColumn: string = '';
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  constructor(
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<Proyecto>,
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



  private data: TreeNode<Proyecto>[] = PROYECTOS_DATA.map(proyecto => <TreeNode<Proyecto>>{
    data: proyecto,
    children: proyecto.Tareas ? proyecto.Tareas.map(tarea => <TreeNode<Proyecto>>{
      data: tarea,
    }) : null,
  });



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
    const dialogRef = this.dialogService.open(CreateProjectComponent);
  }

}
