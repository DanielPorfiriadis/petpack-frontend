import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import {Login} from './login/login';

@Injectable({
  providedIn: 'root'
})

export class Service{
    private loginUrl ='http://localhost:1337/login';

      httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
        })
      };

    constructor(private http: HttpClient){}

//the method that commynicate with the backend and send the post request
    loginService(loginData: Login): any {
    
//here we create the request body in order to be readable by the backend
      const body = new HttpParams()
          .set('userName', loginData.userName)//we create the userName parameter
          .set('password', loginData.password);//we create the password parameter

        return this.http.post(this.loginUrl, body, this.httpOptions);
    }
}