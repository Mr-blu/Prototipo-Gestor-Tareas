import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user  = null;
  public pass = null;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  register() {
    this.router.navigate(['/register']);
  }


  login() {
    this.router.navigate(['/home']);
  }

}
