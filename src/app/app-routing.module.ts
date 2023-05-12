import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ProjectComponent } from './pages/project/project.component';
import { TaskPendingComponent } from './pages/task-pending/task-pending.component';
import { TaskCompletedComponent } from './pages/task-completed/task-completed.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'project',
        component: ProjectComponent
      },
      {
        path: 'task-pending',
        component: TaskPendingComponent
      },
      {
        path: 'task-completed',
        component: TaskCompletedComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
