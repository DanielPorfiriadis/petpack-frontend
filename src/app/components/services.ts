<<<<<<< HEAD
import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Login } from './login/login';
import { FormControl } from '@angular/forms';

=======
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import {Login} from './login/login';
>>>>>>> 9cfad224341da3761db52e0e918195a67db70c6e

@Injectable({
  providedIn: 'root'
})

export class Service{
<<<<<<< HEAD
  private loginUrl = 'http://localhost:1337/login';
  private registerUrl = 'http://localhost:1337/register';
=======
    private loginUrl ='http://localhost:1337/login';
>>>>>>> 9cfad224341da3761db52e0e918195a67db70c6e

      httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
        })
      };

    constructor(private http: HttpClient){}

<<<<<<< HEAD
  @Input() regForm: FormGroup;

=======
>>>>>>> 9cfad224341da3761db52e0e918195a67db70c6e
//the method that commynicate with the backend and send the post request
    loginService(loginData: Login): any {
    
//here we create the request body in order to be readable by the backend
      const body = new HttpParams()
          .set('userName', loginData.userName)//we create the userName parameter
          .set('password', loginData.password);//we create the password parameter

        return this.http.post(this.loginUrl, body, this.httpOptions);
    }
<<<<<<< HEAD

  registerService(regForm: FormGroup): any {

    //here we create the request body in order to be readable by the backend
    const body = new HttpParams()
      .set('firstName', regForm.get('personalDetails').get('firstname').value)
      .set('lastName', regForm.get('personalDetails').get('lastname').value)
      .set('userName', regForm.get('personalDetails').get('username').value)
      .set('email', regForm.get('personalDetails').get('email').value)
      .set('password', regForm.get('personalDetails').get('password').value)

    return this.http.post(this.registerUrl, body, this.httpOptions);
  }

}
=======
}
>>>>>>> 9cfad224341da3761db52e0e918195a67db70c6e
