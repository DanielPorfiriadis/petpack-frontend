import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { UserData } from '../auth/user-data.model';
import { userInfo } from 'os';
import { PetData } from '../auth/pet.model';
import { PetService } from '../auth/pet.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})


export class SettingsComponent implements OnInit, OnDestroy {
  userNewDetails: FormGroup;
  petNewDetails: FormGroup;
  newPet: FormGroup;

  constructor(private router: Router, public authService: AuthService, public petService: PetService) { }

  public username = '';
  public user: UserData;
  userId: string;
  imagePreview: string;
  x = 1;
  iterations: any[] = [this.x];
  petNames: string[] = [];
  petGenders: string[] = [];
  pets: PetData;
  petArray: any[] = [];
  userPets: PetData[] = [];
  petSub: Subscription;
  petsCount:number;

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.username = this.authService.getUserName();
    this.userNewDetails = new FormGroup({
      'newFirstName': new FormControl(null),
      'newLastName': new FormControl(null),
      'newUsername': new FormControl(null),
      'newEmail': new FormControl(null),
      'newPassword': new FormControl(null),
      'newAvatar': new FormControl(null),

    })
    this.petNewDetails = new FormGroup({

      'newPetName': new FormControl(null),
      'newGender': new FormControl(null),
      'newSpecies': new FormControl(null),
      'newPetSpecies': new FormControl(null)
    })
    this.newPet = new FormGroup({

      'newPetName': new FormControl(null),
      'newGender': new FormControl(null),
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
        this.userNewDetails.patchValue({
          newFirstName : userData.firstName,
          newLastName : userData.lastName,
          newUsername : userData.userName,
          newEmail : userData.email,
          newAvatar : userData.imagePath,
        });
        this.imagePreview=this.user.imagePath;
      });
      this.petService.getUserPets(this.username);
      this.petSub = this.petService.getPetsUpdateListener()
        .subscribe((petsData: {pets : PetData[], petsCount: number}) => {
          this.userPets = petsData.pets;
          this.petsCount = petsData.petsCount;
        })
  }

  cancel(): void {
    this.router.navigate(["/feed-page"]);
  }

  addNewPet(): void {
    this.pets = {
      id: '',
      petName: this.petNewDetails.get('newPetName').value,
      species: this.petNewDetails.get('newSpecies').value,
      gender: this.petNewDetails.get('newGender').value,
      ownerUsername: this.username
    };
    
    this.petArray.push(this.pets);

    this.x += 1;
    this.iterations.push(this.x);
  }

  petSaveSubmited(){
    let pet: PetData = {
      id: '',
      petName: this.petNewDetails.get('newPetName').value,
      species: this.petNewDetails.get('newSpecies').value,
      gender: this.petNewDetails.get('newGender').value,
      ownerUsername: this.username
    }
    this.petService.createPet(pet.petName, pet.species, pet.gender, pet.ownerUsername)
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(["/settings"]);
  }

  petChangeSubmited(){

    let pet: PetData = {
      id: '',
      petName: this.petNewDetails.get('newPetName').value,
      species: this.petNewDetails.get('newSpecies').value,
      gender: this.petNewDetails.get('newGender').value,
      ownerUsername: this.username
    };
    console.log(pet);
    this.petService.updatePet(pet.petName, pet.species, pet.gender, pet.ownerUsername);
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.userNewDetails.patchValue({newAvatar: file});
    this.userNewDetails.get('newAvatar').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
        this.imagePreview = (reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  userSubmited(){

     let image =this.userNewDetails.get('newAvatar').value;
    this.authService.updateUser(
      this.userNewDetails.get('newFirstName').value,
      this.userNewDetails.get('newLastName').value,
      this.userNewDetails.get('newUsername').value,
      this.userNewDetails.get('newEmail').value,
      this.userNewDetails.get('newPassword').value,
      image
      );
  }
ngOnDestroy(){
  this.petSub.unsubscribe();
}
  submited(): void {
    this.pets = {
      id: '',
      petName: this.petNewDetails.get('newPetName').value,
      species: this.petNewDetails.get('newSpecies').value,
      gender: this.petNewDetails.get('newGender').value,
      ownerUsername: this.petNewDetails.get('newUsername').value
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

