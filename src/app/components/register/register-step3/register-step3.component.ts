import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
<<<<<<< HEAD
import { FormGroup } from '@angular/forms'; 
=======
import { FormGroup } from '@angular/forms';
>>>>>>> 573053cac1574dc4dc61eaa920b1aad8e5360bb3

@Component({
  selector: 'app-register-step3',
  templateUrl: './register-step3.component.html',
  styleUrls: ['./register-step3.component.css']
})
export class RegisterStep3Component implements OnInit {

  constructor() { }

  @Input() regForm: FormGroup;
  formSubmitted: boolean = false;

<<<<<<< HEAD
  ngOnInit(): void {
=======
  ngOnInit() {
  }

  submit() {
    console.log('submitted');
    console.log(this.regForm.value);
    this.formSubmitted = true;

>>>>>>> 573053cac1574dc4dc61eaa920b1aad8e5360bb3
  }

  submit() {
    console.log('submitted');
    console.log(this.regForm.value);
    this.formSubmitted = true;
  }

}
