import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Service } from '../../services';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-register-step3',
  templateUrl: './register-step3.component.html',
  styleUrls: ['./register-step3.component.css']
})
export class RegisterStep3Component implements OnInit {

  constructor(public service: Service, private router: Router) { }

  @Input() regForm: FormGroup;
  @Input() persDetails;
  @Input() petsDetails;
  formSubmitted: boolean = false;

  ngOnInit() {
  }

  submit(): void{
    /*console.log('submitted');
    console.log(this.regForm.value);*/
    this.formSubmitted = true;
    let _this=this;

    this.service.registerService(this.regForm).subscribe({
      next:x=>{
        console.log(x);
        _this.router.navigateByUrl('/afterlogin');
      },
      error:error=>{
        _this.regForm.hasError(error);   
      }   
    });
  }
}
