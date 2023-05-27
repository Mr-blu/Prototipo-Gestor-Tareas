import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbMenuItem } from '@nebular/theme';
import { TaskService } from 'src/app/services/task.service';
import { PROYECTOS_DATA } from 'src/app/utils/data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public items: NbMenuItem[] = [];

  constructor(
    private router: Router,
    private taskService: TaskService
  ) {
    this.items = [
      {
        title: 'Administrar Proyectos',
        icon: 'folder-add-outline',
        link: '/home/project'
      },
      {
        title: 'Tareas pendientes',
        icon: { icon: 'edit-2-outline', pack: 'eva' },
        link: '/home/task-pending'
      },
      {
        title: 'Tareas realizadas',
        icon: { icon: 'checkmark-circle-outline', pack: 'eva' },
        link: '/home/task-completed'
      },
      {
        title: 'Salir',
        icon: 'unlock-outline',
        url: ''
      },
    ]
  }

  async ngOnInit() {
    await this.taskService.setProjects(PROYECTOS_DATA);
  }

  logout() {
    this.router.navigate(['']);
  }

}
