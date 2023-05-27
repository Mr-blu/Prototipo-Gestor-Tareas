import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { NbDialogService, NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { CreateProjectComponent } from '../create-project/create-project.component';
import { Proyecto } from 'src/app/utils/interfaces';
import { PROYECTOS_DATA } from 'src/app/utils/data';
import { TaskService } from 'src/app/services/task.service';

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

  public projects: Proyecto[] = [];
  dataSource: NbTreeGridDataSource<Proyecto>;
  customColumn = 'Nombre';
  defaultColumns = ['Descripción', 'Estado', 'FechaInicio', 'FechaFin'];
  allColumns = [this.customColumn, ...this.defaultColumns];
  sortColumn: string = '';
  sortDirection: NbSortDirection = NbSortDirection.NONE;


  constructor(
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<Proyecto>,
    private dialogService: NbDialogService,
    private taskService: TaskService
  ) {
    taskService.changeProjects()
    this.taskService.projectsEmitter.subscribe(data => {
      console.log("EMIT ProjectComponent init: ", data);
      this.projects = data
      let response = data.map(proyecto => <TreeNode<Proyecto>>{
        data: proyecto,
        children: proyecto.Tareas ? proyecto.Tareas.map(tarea => <TreeNode<Proyecto>>{
          data: tarea,
        }) : null,
      });

      this.dataSource = this.dataSourceBuilder.create(response);
    })
    //  this.dataSource = this.dataSourceBuilder.create(this.data);

  }


  async ngOnInit() {
    this.taskService.changeProjects()
    await this.taskService.projectsEmitter.subscribe(data => {
      console.log("EMIT ProjectComponent init: ", data);
      this.projects = data
      let response = data.map(proyecto => <TreeNode<Proyecto>>{
        data: proyecto,
        children: proyecto.Tareas ? proyecto.Tareas.map(tarea => <TreeNode<Proyecto>>{
          data: tarea,
        }) : null,
      });

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
    dialogRef.onClose.subscribe(data => {
      console.log("DIALOG: ", data);
      if (data) {
        this.addProject(data);
      }
    })

  }

  addProject(projectNew: Proyecto) {
    let tmp: Proyecto[] = [...this.projects]
    let data = { ...projectNew, id: this.projects.length + 1 }
    tmp.push(data)
    this.taskService.setProjects(tmp);

  }

  reset(event: any) {
    console.log("RESET: ", event);
  }

}
