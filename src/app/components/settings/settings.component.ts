import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { mimeType } from "../feed-page/feedview/mime-type.validator";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor() { }

  form: FormGroup;
  enteredContent= '';

  ngOnInit(): void {

    this.form = new FormGroup({
      content : new FormControl(null, {
          validators: [Validators.required], 
          updateOn: "change"}),
          image: new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]
          })
    });

  }
}
