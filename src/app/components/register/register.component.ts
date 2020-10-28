import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  title = 'Petpack';

  registrationForm: FormGroup;

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      'personalDetails': new FormGroup({
        'firstname': new FormControl(null, [Validators.required, Validators.minLength(2)]),
        'lastname': new FormControl(null, [Validators.required, Validators.minLength(2)]),
        'username': new FormControl(null, [Validators.required, Validators.minLength(4)]),
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'password': new FormControl(null, [Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[$@$!%*?&]).{6,}')]),
        'conf-password': new FormControl(null, [Validators.required]),
      }),
      'petDetails': new FormGroup({
        'petName': new FormControl(null, [Validators.required, Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$')]),
        'species': new FormControl(null, Validators.required),
        'gender': new FormControl(null, Validators.required),
      })
    });

  }

}
