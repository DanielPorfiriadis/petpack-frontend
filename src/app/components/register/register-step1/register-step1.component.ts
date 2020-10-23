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

<<<<<<< HEAD
  ngOnInit(): void {
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
=======
  ngOnInit() {
  }

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

  getPasswordErrorMessage() {
    if (this.regForm.get('personalDetails').get('password').hasError('required')) {
      return 'You must enter a value';
    }


    return 'At least 6 characters and include: number(s) & special characters';

  }

  getConfirmErrorMessage() {
    const pass = this.regForm.get('personalDetails').get('password').value;
    const conf = this.regForm.get('personalDetails').get('conf-password').value;
    if ((pass !== conf) && (this.regForm.get('personalDetails').get('conf-password').value != null) && (this.regForm.get('personalDetails').get('password').value != null)) {
      return 'Passwords do not match'
    }
    else if (this.regForm.get('personalDetails').get('password').hasError('required')) {
      return 'You must enter a value';
    }
    else {
      return 'Todos Bien!'
    }
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
>>>>>>> 573053cac1574dc4dc61eaa920b1aad8e5360bb3
