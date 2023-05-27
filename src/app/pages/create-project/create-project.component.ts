import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { Proyecto } from 'src/app/utils/interfaces';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {


  public projectForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
  });

  constructor(
    private dialogRef: NbDialogRef<CreateProjectComponent>
  ) { }

  ngOnInit(): void {
  }


  onSubmit() {
    const project: Proyecto = {
      Nombre: this.projectForm.value.name,
      Descripción: this.projectForm.value.description,
      FechaInicio: this.projectForm.value.startDate,
      FechaFin: this.projectForm.value.endDate,
      Estado: this.projectForm.value.status,
      Tareas: [],
      id: 0
    };
    this.dialogRef.close(project);

  }
}
