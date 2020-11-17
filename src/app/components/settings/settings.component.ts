import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Service } from '../services';
import { UserData } from '../auth/user-data.model';
import { userInfo } from 'os';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})


export class SettingsComponent implements OnInit {
  newDetails: FormGroup;

  constructor(public service: Service, private router: Router,public authService: AuthService) { }

  public username = '';
  public user: UserData;
  userId: string;
  x = 1;
  iterations: any[] = [this.x];
  petNames: string[] = [];
  petGenders: string[] = [];

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.username = this.authService.getUserName();
    this.newDetails = new FormGroup({
       /*key: new FormArray(this.iterations.map(data => new FormControl(data.key))),*/
      'newFirstName': new FormControl(null),
      'newLastName': new FormControl(null),
      'newUsername': new FormControl(null),
      'newPetName': new FormControl(null),
      'newGender': new FormControl(null),
      'newEmail': new FormControl(null)
    })

    this.authService.getUserInfo(this.userId)
      .subscribe(userData => {
        this.user = {
          lastName: userData.lastName,
          email: userData.email,
          userName: userData.userName,
          firstName: userData.firstName,
          imagePath: userData.imagePath,
          id: userData._id
        };
      })
    /*this.firstname = this.user.firstname;*/

  }
  cancel(): void {
    this.router.navigate(["/feed-page"]);
  }

  addNewPet(): void {
    this.petNames.push(this.newDetails.get('newPetName').value);
    this.petGenders.push(this.newDetails.get('newGender').value);
    this.x += 1;
    this.iterations.push(this.x);
  }

  submited(): void {
    this.petNames.push(this.newDetails.get('newPetName').value);
    this.petGenders.push(this.newDetails.get('newGender').value);

    console.log(this.newDetails.get('newFirstName').value);
    console.log(this.newDetails.get('newLastName').value);
    console.log(this.newDetails.get('newUsername').value);
    console.log(this.newDetails.get('newEmail').value);
    console.log(this.petNames);
    console.log(this.petGenders);
/*    let _this = this;

    this.service.SettingsService(this.newDetails).subscribe({
      next: x => {
        console.log(x);
      },
      error: error => {
        _this.newDetails.hasError(error);
      }
    });*/
  }


}
