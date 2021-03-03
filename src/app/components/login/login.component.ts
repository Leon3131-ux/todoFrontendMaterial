import { Component } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginService} from '../../services/login.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });

  constructor(private router: Router,
              private loginService: LoginService,
              private authService: AuthService) { }

  login(){
    this.loginService.login(this.loginForm.getRawValue()).subscribe(data => {
      this.authService.setToken(data.headers.get('Authorization'));
      this.router.navigate(['/home']);
    },
      () => {})
  }

  navigateToSignUp(){
    this.router.navigate(['/singUp']);
  }

}
