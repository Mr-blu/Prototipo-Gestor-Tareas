import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public userDefault = "unad";
  public pass = 1234;

  public formLogin: FormGroup = new FormGroup({
    user: new FormControl('', [Validators.required]),
    pass: new FormControl('', [Validators.required]),
  });

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  register() {
    this.router.navigate(['/register']);
  }


  login() {
    if (this.formLogin.value.user == this.userDefault && this.formLogin.value.pass == this.pass) {
      this.router.navigate(['/home']);
    }
    else {
      alert("Usuario o contraseña incorrecta");
    }
  }

}
