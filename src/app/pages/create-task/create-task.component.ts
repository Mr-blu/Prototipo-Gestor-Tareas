import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { TaskService } from 'src/app/services/task.service';
import { Proyecto, Tarea } from 'src/app/utils/interfaces';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {

  projects: Proyecto[] = [];


  public taskForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    proyecto: new FormControl('', [Validators.required]),
    prioridad: new FormControl('', [Validators.required]),
  });

  constructor(
    private dialogRef: NbDialogRef<CreateTaskComponent>,
    private taskService: TaskService,
  ) {
    this.taskService.changeProjects()
    this.taskService.projectsEmitter.subscribe(data => {
      console.log("EMIT ProjectComponent init: ", data);
      this.projects = data
    })
  }

  async ngOnInit() {
    this.taskService.changeProjects()
    await this.taskService.projectsEmitter.subscribe(data => {
      console.log("EMIT ProjectComponent init: ", data);
      this.projects = data
    })
  }


  onSubmit() {
    const task: Tarea = {
      Nombre: this.taskForm.value.name,
      Descripción: this.taskForm.value.description,
      FechaInicio: this.taskForm.value.startDate,
      FechaFin: this.taskForm.value.endDate,
      Estado: 'En curso',
      Proyecto: this.taskForm.value.proyecto,
      Prioridad: '',
      Usuario: '',
      id: 0
    };
    console.log("task: ", task);
    
    this.dialogRef.close(task);

  }

}
