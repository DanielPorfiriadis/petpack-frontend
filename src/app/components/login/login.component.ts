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

  hide = true;

   //We manually create a loginData object that holds login credentials
  loginData: Login  = {
    userName : 'danielsan',
    password : '1234'
  };

  constructor(public service: Service) {}


    loginForm: FormGroup;

  ngOnInit(): void {

      this.loginForm = new FormGroup({'Username': new FormControl(),
        'Password': new FormControl(),
      });
      /*this.loginUser();*/
    }
    
    // the method we use to call the login service
  loginUser(): void{

    console.log(this.loginForm.value);
    const respondMessages = this.service.loginService(this.loginForm).subscribe();
      console.log(respondMessages);
    }
}
