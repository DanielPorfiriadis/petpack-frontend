import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-registration-step2',
  templateUrl: './registration-step2.component.html',
  styleUrls: ['./registration-step2.component.css']
})
export class RegistrationStep2Component implements OnInit {

  constructor() { }

  @Input() regForm: FormGroup;

  ngOnInit() {
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
