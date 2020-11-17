import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Login } from './login/login';
import { FormControl } from '@angular/forms';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class Service{
  private loginUrl = 'http://localhost:1337/login';
  private registerUrl = 'http://localhost:1337/register/user';

      httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
        })
      };

    constructor(private http: HttpClient){}

  @Input() regForm: FormGroup;
  @Input() loginForm: FormGroup;

//the method that commynicate with the backend and send the post request
  loginService(loginForm: FormGroup): any {
    
      //here we create the request body in order to be readable by the backend
    const body = new HttpParams()
      .set('userName', loginForm.get('Username').value) //we create the userName parameter
      .set('password', loginForm.get('Password').value);//we create the password parameter
      
      return this.http.post(this.loginUrl, body, this.httpOptions);
    }

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