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
   //We manually create a loginData object that holds login credentials
  loginData: Login  = {
    userName : 'danielsan',
    password : '1234'
  };

  constructor(public service: Service) {}


<<<<<<< HEAD
  hide = true;

   //We manually create a loginData object that holds login credentials
  loginData: Login  = {
    userName : 'danielsan',
    password : '1234'
  };

  constructor(public service: Service) {}


=======
>>>>>>> 9cfad224341da3761db52e0e918195a67db70c6e
    loginForm: FormGroup;

    ngOnInit(): void {
      this.loginUser();
      this.loginForm = new FormGroup({'Username': new FormControl(),
            'Password': new FormControl(),});
    }
    
    // the method we use to call the login service
<<<<<<< HEAD
  loginUser(): void{
=======
    loginUser(): void{
>>>>>>> 9cfad224341da3761db52e0e918195a67db70c6e

      console.log(this.loginData);
      const respondMessages = this.service.loginService(this.loginData).subscribe();
      console.log(respondMessages);
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> 9cfad224341da3761db52e0e918195a67db70c6e
