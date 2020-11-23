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
      'newFirstName': new FormControl(null, [Validators.minLength(2)]),
      'newLastName': new FormControl(null, [Validators.minLength(2)]),
      'newUsername': new FormControl(null, [Validators.minLength(4)]),
      'newEmail': new FormControl(null, [ Validators.email]),
      'newPassword': new FormControl(null, [ Validators.pattern('(?=.*[0-9])(?=.*[$@$!%*?&]).{6,}')]),
      'newAvatar': new FormControl(null),
      'confirmPassword': new FormControl(null, [Validators.required]),

    })
    
    this.petNewDetails = new FormGroup({

      'newPetName': new FormControl(null),
      'newGender': new FormControl(null),
      'newSpecies': new FormControl(null),
      'newPetSpecies': new FormControl(null)
    })
    this.newPet = new FormGroup({

      'newPetName': new FormControl(null, [Validators.required, Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$')]),
      'newGender': new FormControl(null, Validators.required),
      'newSpecies': new FormControl(null, Validators.required),
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

  petSaveSubmited() {

    this.newPet.get('newPetName').markAsTouched();
    this.newPet.get('newPetName').updateValueAndValidity();
    this.newPet.get('newSpecies').markAsTouched();
    this.newPet.get('newSpecies').updateValueAndValidity();
    this.newPet.get('newGender').markAsTouched();
    this.newPet.get('newGender').updateValueAndValidity();

    if (!this.newPet.get('newPetName').hasError('required') &&
      !this.newPet.get('newPetName').hasError('pattern') &&
      !this.newPet.get('newSpecies').hasError('required') &&
      !this.newPet.get('newGender').hasError('required'))
    {
      let pet: PetData = {
        id: '',
        petName: this.newPet.get('newPetName').value,
        species: this.newPet.get('newSpecies').value,
        gender: this.newPet.get('newGender').value,
        ownerUsername: this.username
        }
      this.petService.createPet(pet.petName, pet.species, pet.gender, pet.ownerUsername)
      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      }
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(["/settings"]);
    }
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

  userSubmited() {
    let image = this.userNewDetails.get('newAvatar').value;
    // if (!this.userNewDetails.get('newFirstName').hasError('required') &&
    //   !this.userNewDetails.get('newFirstName').hasError('minLength') &&
    //   !this.userNewDetails.get('newLastName').hasError('required') &&
    //   !this.userNewDetails.get('newLastName').hasError('minLength') &&
    //   !this.userNewDetails.get('newUsername').hasError('required') &&
    //   !this.userNewDetails.get('newUsername').hasError('minLength') &&
    //   !this.userNewDetails.get('newEmail').hasError('required') &&
    //   !this.userNewDetails.get('newEmail').hasError('email') &&
    //   !this.userNewDetails.get('newPassword').hasError('required') &&
    //   !this.userNewDetails.get('newPassword').hasError('pattern')) {

      this.authService.updateUser(
        this.userNewDetails.get('newFirstName').value,
        this.userNewDetails.get('newLastName').value,
        this.userNewDetails.get('newUsername').value,
        this.userNewDetails.get('newEmail').value,
        this.userNewDetails.get('newPassword').value,
        image
      );
    // }
     
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

  }

  matching() {
    const pass = this.userNewDetails.get('newPassword').value;
    const conf = this.userNewDetails.get('confirmPassword').value;
    if (pass !== conf) {
      return this.userNewDetails.get('confirmPassword').setErrors({ 'notMatching': true });
    }
    return this.userNewDetails.get('confirmPassword').setErrors(null);
  }

  getConfirmErrorMessage() {
    if (this.userNewDetails.get('confirmPassword').hasError('notMatching')) {
      return 'Passwords do not match'
    }
  }

  /*email error message*/
  getEmailErrorMessage() {
    if (this.userNewDetails.get('newEmail').hasError('required')) {
      return 'You must enter a value';
    }

    return this.userNewDetails.get('newEmail').hasError('email') ? 'Not a valid email' : '';
  }

  /*first name error message*/
  getFirstnameErrorMessage() {
    if (this.userNewDetails.get('newFirstName').hasError('required')) {
      return 'You must enter a value';
    }
    return 'First name must be greater than 2 characters'

  }

  /*last name error message*/
  getLastnameErrorMessage() {
    if (this.userNewDetails.get('newLastName').hasError('required')) {
      return 'You must enter a value';
    }

    return 'First name must be greater than 2 characters'

  }

  /*username error message*/
  getUsernameErrorMessage() {
    if (this.userNewDetails.get('newUsername').hasError('required')) {
      return 'You must enter a value';
    }

    return 'First name must be greater than 4 characters'

  }

  /*password error message*/
  getPasswordErrorMessage() {
    if (this.userNewDetails.get('newPassword').hasError('required')) {
      return 'You must enter a value';
    }
    return 'At least 6 characters and include: number(s) & special characters';
  }

  /*Pet Name Validation*/
  getPetnameErrorMessage() {
    if (this.petNewDetails.get('newPetName').hasError('required')) {
      return 'You must enter a value';
    }
    return 'Only letters are allowed'

  }

  getSpeciesErrorMessage() {
    if (this.petNewDetails.get('newSpecies').hasError('required')) {
      return 'You must select a value';
    }
  }

  getGenderErrorMessage() {
    if (this.petNewDetails.get('newGender').hasError('required')) {
      return 'You must select gender';
    }
  }

/*New Pet*/

  getNewPetnameErrorMessage() {
    if (this.newPet.get('newPetName').hasError('required')) {
      return 'You must enter a value';
    }
    return 'Only letters are allowed'

  }

  getNewSpeciesErrorMessage() {
    if (this.newPet.get('newSpecies').hasError('required')) {
      return 'You must select a value';
    }
  }

  getNewGenderErrorMessage() {
    if (this.newPet.get('newGender').hasError('required')) {
      return 'You must select gender';
    }
  }
}

