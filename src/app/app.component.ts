import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
<<<<<<< HEAD
  })
  export class AppComponent {
  title = 'petpack-frontend';
=======
})

export class AppComponent implements OnInit {
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

>>>>>>> 5369d94190eebcae466a8dd586c8c3c8789b850f
}





