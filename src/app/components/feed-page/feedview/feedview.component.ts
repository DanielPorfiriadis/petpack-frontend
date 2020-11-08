import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-feedview',
  templateUrl: './feedview.component.html',
  styleUrls: ['./feedview.component.css'],
})
export class FeedviewComponent implements OnInit {

  items: number[] = [];
  constructor() {
    for (let i = 0; i < 100; i++) {
      this.items.push(i);
    }
  }

  ngOnInit(): void {
   
  }

}
