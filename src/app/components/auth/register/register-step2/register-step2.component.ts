import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-register-step2',
  templateUrl: './register-step2.component.html',
  styleUrls: ['./register-step2.component.css']
})
export class RegisterStep2Component implements OnInit {
  imagePreview: string;
  constructor() { }
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
  }

}


/*
@Output("addNewPet") addNewPet: EventEmitter < any > = new EventEmitter();
constructor() { }
onClick() {
  this.addNewPet.emit();
}*/
