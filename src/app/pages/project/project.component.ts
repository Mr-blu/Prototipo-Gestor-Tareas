import { Component, OnInit } from '@angular/core';
import { NbDialogService, NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { Project } from 'src/app/utils/interfaces';
import { CreateProjectComponent } from '../create-project/create-project.component';

interface TreeNode<T> {
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

  dataSource: NbTreeGridDataSource<Project>;

  sortColumn: string = '';
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  constructor(
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<Project>,
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



  private data: TreeNode<Project>[] = [
    {
      data: { Nombre: 'Proyecto 1', Descripción: 'Descripción 1', Estado: this.getStatus('E'), FechaInicio: '01-01-2023', FechaFin: '01-31-2023' },
    },
    {
      data: { Nombre: 'Proyecto 2', Descripción: 'Descripción 2', Estado: this.getStatus('F'), FechaInicio: '01-01-2023', FechaFin: '15-30-2023' },
    },
    {
      data: { Nombre: 'Proyecto 3', Descripción: 'Descripción 2', Estado: this.getStatus('E'), FechaInicio: '01-01-2023', FechaFin: '01-01-2023' },

    },
  ];


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
