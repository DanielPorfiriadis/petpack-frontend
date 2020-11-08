import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {Login} from './login';

@Injectable({
  providedIn: 'root'
})
export class LoginService{
    private loginUrl ='http://localhost:1337/login';
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };

      constructor(private http: HttpClient){}

      login(loginData: Login): any {
        console.log(loginData);
          const body = JSON.stringify(loginData);
          console.log(body);

          this.http.post(this.loginUrl, body);
          return "ok done";
      }
}