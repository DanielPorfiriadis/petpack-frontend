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

<<<<<<< HEAD

=======
>>>>>>> 4fd2717211d1a4f61a9b318e31f4c40a80aebd30
}
>>>>>>> 573053cac1574dc4dc61eaa920b1aad8e5360bb3
