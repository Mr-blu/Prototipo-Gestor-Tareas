import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbSidebarModule, NbButtonModule, NbInputModule, NbCardModule, NbIconModule, NbMenuModule, NbTableModule, NbTreeGridModule, NbDialogModule, NbSelectModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { LoginComponent } from './pages/login/login.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProjectComponent } from './pages/project/project.component';
import { TaskPendingComponent } from './pages/task-pending/task-pending.component';
import { TaskCompletedComponent } from './pages/task-completed/task-completed.component';
import { CreateProjectComponent } from './pages/create-project/create-project.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProjectComponent,
    TaskPendingComponent,
    TaskCompletedComponent,
    CreateProjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'dark' }),
    NbLayoutModule,
    NbEvaIconsModule,
    RouterModule,
    NbSidebarModule.forRoot(), //if this is your app.module
    NbButtonModule,
    NbInputModule,
    NbCardModule,
    NbIconModule,
    NbMenuModule.forRoot(),
    NbTableModule,
    NbTreeGridModule,
    NbDialogModule.forRoot(),
    ReactiveFormsModule,
    NbSelectModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
