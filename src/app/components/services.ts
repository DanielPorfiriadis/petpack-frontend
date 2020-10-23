import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {Login} from './login/login';

@Injectable({
  providedIn: 'root'
})
export class Service{
    private loginUrl ='http://localhost:1337/login';
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };

      constructor(private http: HttpClient){}

      login(login: Login): any {
          const body = JSON.stringify(login);
          console.log(body);
            return this.http.post(this.loginUrl, body);
      }
}