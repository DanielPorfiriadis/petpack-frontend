import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { PetService } from '../../pet.service';
import { mimeType } from "../../../feed-page/feedview/mime-type.validator";

@Component({
  selector: 'app-register-step3',
  templateUrl: './register-step3.component.html',
  styleUrls: ['./register-step3.component.css']
})
export class RegisterStep3Component implements OnInit{

  constructor(public authService: AuthService, private router: Router, public petService: PetService) { }

  @Input() regForm: FormGroup;
  //image: new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]
  @Input() persDetails;
  @Input() petsDetails;
  form: FormGroup;
  formSubmitted: boolean = false;
  imagePreview: string;

  ngOnInit(){
    this.form = new FormGroup({
          image: new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]
          })
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
        this.imagePreview = (reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  submit(){
    this.authService.createUser(
    this.regForm.get('personalDetails').get('firstname').value,
    this.regForm.get('personalDetails').get('lastname').value,
    this.regForm.get('personalDetails').get('username').value,
    this.regForm.get('personalDetails').get('email').value,
    this.regForm.get('personalDetails').get('password').value,
    this.form.value.image);
    console.log(this.form.value.image);
    
    this.petService.createPet(
      this.regForm.get('petDetails').get('petName').value,
      this.regForm.get('petDetails').get('species').value,
      this.regForm.get('petDetails').get('gender').value,
      this.regForm.get('personalDetails').get('username').value,
    );
  }
  // submit(): void{
  //   /*console.log('submitted');
  //   console.log(this.regForm.value);*/
  //   this.formSubmitted = true;
  //   let _this=this;

  //   this.service.createUser(this.regForm).subscribe({
  //     next:x=>{
  //       console.log(x);
  //       _this.router.navigateByUrl('/afterlogin');
  //     },
  //     error:error=>{
  //       _this.regForm.hasError(error);   
  //     }   
  //   });
  // }
}
