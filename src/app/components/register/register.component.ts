/*  import { Component, OnInit } from '@angular/core';

@Component({
selector: 'app-register',
templateUrl: './register.component.html',
styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  Roles: any = ['Owner', 'Vet', 'Basic'];

  constructor() { }

  ngOnInit(): void {
  }

}

*/

// b

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
        'firstname': new FormControl(null, Validators.required),
        'lastname': new FormControl(null, Validators.required),
        'username': new FormControl(null, Validators.required),
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'password': new FormControl(null, [Validators.required]),
        'conf-password': new FormControl(null, [Validators.required]),
      }),
      'petDetails': new FormGroup({
        'petName': new FormControl(null, Validators.required),
        'species': new FormControl(null, Validators.required),
        'gender': new FormControl(null, Validators.required),
      })
    });

  }

}
