import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register-step2',
  templateUrl: './register-step2.component.html',
  styleUrls: ['./register-step2.component.css']
})
export class RegisterStep2Component implements OnInit {

  constructor() { }
<<<<<<< HEAD
=======
<<<<<<< HEAD

<<<<<<< HEAD
  @Input() regForm: FormGroup;

  ngOnInit(): void {
=======
=======
>>>>>>> 4fd2717211d1a4f61a9b318e31f4c40a80aebd30
>>>>>>> pap_development
  @Input() regForm: FormGroup;

  ngOnInit() {
  }

  /*Pet Name Validation*/
  getPetnameErrorMessage() {
    if (this.regForm.get('petDetails').get('petName').hasError('required')) {
      return 'You must enter a value';
    }
    return 'Only letters are allowed'

  }

  getSpeciesErrorMessage() {
    if (this.regForm.get('petDetails').get('species').hasError('required')) {
      return 'You must select a value';
    }
  }

  getGenderErrorMessage() {
    if (this.regForm.get('petDetails').get('gender').hasError('required')) {
      return 'You must select gender';
    }
  }

  step2Submitted() {
    this.regForm.get('petDetails').get('petName').markAsTouched();
    this.regForm.get('petDetails').get('petName').updateValueAndValidity();
    this.regForm.get('petDetails').get('species').markAsTouched();
    this.regForm.get('petDetails').get('species').updateValueAndValidity();
    this.regForm.get('petDetails').get('gender').markAsTouched();
    this.regForm.get('petDetails').get('gender').updateValueAndValidity();
<<<<<<< HEAD

=======
>>>>>>> 573053cac1574dc4dc61eaa920b1aad8e5360bb3
  }

  step2Submitted() {
    this.regForm.get('petDetails').get('petName').markAsTouched();
    this.regForm.get('petDetails').get('petName').updateValueAndValidity();
    this.regForm.get('petDetails').get('species').markAsTouched();
    this.regForm.get('petDetails').get('species').updateValueAndValidity();
    this.regForm.get('petDetails').get('gender').markAsTouched();
    this.regForm.get('petDetails').get('gender').updateValueAndValidity();
>>>>>>> pap_development
  }

}


/*
@Output("addNewPet") addNewPet: EventEmitter < any > = new EventEmitter();
constructor() { }
onClick() {
  this.addNewPet.emit();
}*/
