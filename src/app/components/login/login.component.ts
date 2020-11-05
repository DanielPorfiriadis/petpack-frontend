import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import {Login} from './login';
import {Service} from '../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  response=null;
  hide = true;
  self=null;
   //We manually create a loginData object that holds login credentials


  constructor(public service: Service, private cookieService: CookieService,private router: Router) {}

   
    loginForm: FormGroup;

  ngOnInit(): void {

      this.loginForm = new FormGroup({'Username': new FormControl(),
        'Password': new FormControl(),
      });
      /*this.loginUser();*/
    }
    
    // the method we use to call the login service
  loginUser(): void{
    let _this=this;
    this.service.loginService(this.loginForm).subscribe({
      next:x=>{
        
        console.log(x);
        _this.cookieService.set('jwt',x.jwt);
        _this.cookieService.set('userId',x.userId);
        _this.router.navigateByUrl('/afterlogin');
      },
      error:error=>{
        _this.loginForm.hasError(error);      
    }
  });
    
  }

    
}
