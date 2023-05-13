import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public items: NbMenuItem[] = [];

  constructor(
    private router: Router
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

  ngOnInit(): void {
  }

  logout() {
    this.router.navigate(['']);
  }

}
