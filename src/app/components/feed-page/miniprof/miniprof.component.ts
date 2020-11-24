import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup } from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { UserData } from '../../auth/user-data.model';
import { userInfo } from 'os';



@Component({
  selector: 'app-miniprof',
  templateUrl: './miniprof.component.html',
  styleUrls: ['./miniprof.component.css']
})
export class MiniprofComponent implements OnInit {

  constructor(public authService: AuthService) { }
  public username='';
  public user:UserData;
  userId:string;
  picSource ='';

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.username =  this.authService.getUserName();
    this.authService.getUserInfo(this.userId)
    .subscribe(userData=>{
      this.user = {
        lastName: userData.lastName,
        email: userData.email,
        userName: userData.userName,
        firstName: userData.firstName,
        imagePath: userData.imagePath,
        id: userData._id
      };
      this.picSource=this.user.imagePath;
      this.username = this.user.userName;
    })
  }

}
