import { Component, OnInit, Input} from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {AuthService} from '../auth.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  credentials = true;
  isLoading= false;
  response=null;
  hide = true;
  self = null;
  n = 1;
   //We manually create a loginData object that holds login credentials


  constructor(public authService: AuthService) { }

   onLogin(form: NgForm) {
       if(form.invalid){
           return;
       }
     this.authService.login(form.value.username, form.value.password);
     this.credentials = this.authService.getCredentials()
     console.log(this.credentials);
   }

  

    
}