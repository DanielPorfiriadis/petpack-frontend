import { Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';

import { DatashareService } from '../../../services/FeedServices';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  @Input() postInfo: any;
  constructor(private ds: DatashareService, private route: Router) { }

  ngOnInit() {
  }

  showmePostIndetails() {
    this.ds.post = this.postInfo;
    this.route.navigate(['post']);
  }
}

