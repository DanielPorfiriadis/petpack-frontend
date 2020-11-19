import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { UserData } from '../auth/user-data.model';
import { userInfo } from 'os';
import { PetData } from '../auth/pet.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})


export class SettingsComponent implements OnInit {
  newDetails: FormGroup;

  constructor(private router: Router, public authService: AuthService) { }

  public username = '';
  public user: UserData;
  userId: string;
  x = 1;
  iterations: any[] = [this.x];
  petNames: string[] = [];
  petGenders: string[] = [];
  pets: PetData;
  petArray: any[] = [];

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.username = this.authService.getUserName();
    this.newDetails = new FormGroup({
      'newFirstName': new FormControl(null),
      'newLastName': new FormControl(null),
      'newUsername': new FormControl(null),
      'newPetName': new FormControl(null),
      'newGender': new FormControl(null),
      'newEmail': new FormControl(null),
      'newSpecies': new FormControl(null),
      'newPetSpecies': new FormControl(null)
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

  }
  cancel(): void {
    this.router.navigate(["/feed-page"]);
  }

  addNewPet(): void {
    this.pets = {
      id: '',
      petName: this.newDetails.get('newPetName').value,
      species: this.newDetails.get('newSpecies').value,
      gender: this.newDetails.get('newGender').value,
      ownerUsername: this.newDetails.get('newUsername').value
    };
    
    this.petArray.push(this.pets);

    this.x += 1;
    this.iterations.push(this.x);

  }

  submited(): void {
    this.pets = {
      id: '',
      petName: this.newDetails.get('newPetName').value,
      species: this.newDetails.get('newSpecies').value,
      gender: this.newDetails.get('newGender').value,
      ownerUsername: this.newDetails.get('newUsername').value
    };

    this.petArray.push(this.pets);
    console.log(this.petArray);

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
