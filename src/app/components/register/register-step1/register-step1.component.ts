import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register-step1',
  templateUrl: './register-step1.component.html',
  styleUrls: ['./register-step1.component.css']
})
export class RegisterStep1Component implements OnInit {

  constructor() { }

  @Input() regForm: FormGroup;
  
  ngOnInit() {
  }

  /*passwords matching test*/
  matching() {
    const pass = this.regForm.get('personalDetails').get('password').value;
    const conf = this.regForm.get('personalDetails').get('conf-password').value;
    if (pass !== conf) {
      return this.regForm.get('personalDetails').get('conf-password').setErrors({ 'notMatching': true });
    }
    return this.regForm.get('personalDetails').get('conf-password').setErrors(null);
  }

  /*Matching error message*/
  getConfirmErrorMessage() {
    if (this.regForm.get('personalDetails').get('conf-password').hasError('notMatching')) {
      return 'Passwords do not match'
    }
  }

  /*email error message*/
  getEmailErrorMessage() {
    if (this.regForm.get('personalDetails').get('email').hasError('required')) {
      return 'You must enter a value';
    }

    return this.regForm.get('personalDetails').get('email').hasError('email') ? 'Not a valid email' : '';
  }

  /*first name error message*/
  getFirstnameErrorMessage() {
    if (this.regForm.get('personalDetails').get('firstname').hasError('required')) {
      return 'You must enter a value';
    }
    return 'First name must be greater than 2 characters'

  }

  /*last name error message*/
  getLastnameErrorMessage() {
    if (this.regForm.get('personalDetails').get('lastname').hasError('required')) {
      return 'You must enter a value';
    }

    return 'First name must be greater than 2 characters'

  }

  /*username error message*/
  getUsernameErrorMessage() {
    if (this.regForm.get('personalDetails').get('username').hasError('required')) {
      return 'You must enter a value';
    }

    return 'First name must be greater than 4 characters'

  }

  /*password error message*/
  getPasswordErrorMessage() {
    if (this.regForm.get('personalDetails').get('password').hasError('required')) {
      return 'You must enter a value';
    }
    return 'At least 6 characters and include: number(s) & special characters';
  }


  step1Submitted() {

      this.regForm.get('personalDetails').get('firstname').markAsTouched();
      this.regForm.get('personalDetails').get('firstname').updateValueAndValidity();
      this.regForm.get('personalDetails').get('lastname').markAsTouched();
      this.regForm.get('personalDetails').get('lastname').updateValueAndValidity();
      this.regForm.get('personalDetails').get('username').markAsTouched();
      this.regForm.get('personalDetails').get('username').updateValueAndValidity();
      this.regForm.get('personalDetails').get('email').markAsTouched();
      this.regForm.get('personalDetails').get('email').updateValueAndValidity();
      this.regForm.get('personalDetails').get('password').markAsTouched();
      this.regForm.get('personalDetails').get('password').updateValueAndValidity();
      this.regForm.get('personalDetails').get('conf-password').markAsTouched();
      this.regForm.get('personalDetails').get('conf-password').updateValueAndValidity();

    }

}
