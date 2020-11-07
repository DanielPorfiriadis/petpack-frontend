import { Component, OnInit } from '@angular/core';

import { DatashareService } from '../../../services/FeedServices';

@Component({
  selector: 'app-postindetails',
  templateUrl: './postindetails.component.html',
  styleUrls: ['./postindetails.component.css']
})
export class PostindetailsComponent implements OnInit {

  constructor(public ds: DatashareService) { } 

  // kanonika einai private

  ngOnInit() {
  }

}
