import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'petpack-frontend';

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
      'contactDetails': new FormGroup({
        'email': new FormControl(null),/* gia kapoio logo an to sbisw buggarei*/
        'petName': new FormControl(null, Validators.required),
        'phone': new FormControl(null), /*to idio me prin*/
        'species': new FormControl(null, Validators.required),
        'gender': new FormControl(null, Validators.required),
      })
    });

  }

}





