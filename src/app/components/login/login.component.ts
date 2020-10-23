import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import {Login} from './login';
import {Service} from '../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
   
  login: Login ={
    userName : 'danielsan11',
    password : '1234'
  };

  constructor(public loginService: Service) {}


    loginForm: FormGroup;

    ngOnInit(): void {
      this.loginUser();
      this.loginForm = new FormGroup({'Username': new FormControl(),
            'Password': new FormControl(),});
    }
    loginUser(): void{
      console.log(this.login);
      const respondMessages = this.loginService.login(this.login);
      console.log(respondMessages);
    }
}