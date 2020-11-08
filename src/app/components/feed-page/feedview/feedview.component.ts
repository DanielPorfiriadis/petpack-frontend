import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-feedview',
  templateUrl: './feedview.component.html',
  styleUrls: ['./feedview.component.css'],
})
export class FeedviewComponent implements OnInit {

  message: string;


  items: number[] = [];
  posts: any[] = [];
  constructor() {
    for (let i = 0; i < 5; i++) {
      this.items.push(i);
    }
  }

  ngOnInit(): void {
   
  }

  createNewPost(): void {
    this.posts.push(this.message);
  }

  deletePost(i: number): void {
    this.posts.splice(i,1)
  }

}
