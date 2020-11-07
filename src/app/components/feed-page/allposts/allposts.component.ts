import { Component, OnInit } from '@angular/core';

import {CookieService} from 'ngx-cookie-service';

import { PostService } from '../../../services/PostService';


import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-allposts',
  templateUrl: './allposts.component.html',
  styleUrls: ['./allposts.component.css']
})
export class AllpostsComponent implements OnInit {

  respond: Array<any>;
  http: any;
  constructor(public service: PostService, private cookieService: CookieService,private router: Router) {}

  ngOnInit() {
    this.http.makeRequest("posts", "Get").subscribe( (res: any) => {
      this.respond = res;
    },
    (error: any) => {
      console.log(error);
    });
  }

}