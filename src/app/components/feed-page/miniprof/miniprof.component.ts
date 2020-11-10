import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup } from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-miniprof',
  templateUrl: './miniprof.component.html',
  styleUrls: ['./miniprof.component.css']
})
export class MiniprofComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
