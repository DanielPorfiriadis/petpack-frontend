import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Service } from '../../services';

@Component({
  selector: 'app-register-step3',
  templateUrl: './register-step3.component.html',
  styleUrls: ['./register-step3.component.css']
})
export class RegisterStep3Component implements OnInit {

  constructor(public service: Service) { }

  @Input() regForm: FormGroup;
  @Input() persDetails;
  @Input() petsDetails;
  formSubmitted: boolean = false;

  ngOnInit() {
  }

  submit() {
    /*console.log('submitted');
    console.log(this.regForm.value);*/
    this.formSubmitted = true;

    console.log(this.regForm.value);
    const respondMessages = this.service.registerService(this.regForm).subscribe();
    console.log(respondMessages);
    

  }

}


