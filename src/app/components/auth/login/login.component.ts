import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {AuthService} from '../auth.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  isLoading= false;
  response=null;
  hide = true;
  self=null;
   //We manually create a loginData object that holds login credentials


   constructor(public authService: AuthService) {}

   onLogin(form: NgForm) {
       if(form.invalid){
           return;
       }
       this.authService.login(form.value.username , form.value.password);
   }

    
}
