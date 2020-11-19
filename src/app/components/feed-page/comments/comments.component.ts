import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  message: string;


  items: number[] = [];
  comment: any[] = [];
  constructor() {
    for (let i = 0; i < 5; i++) {
      this.items.push(i);
    }
  }

  ngOnInit(): void {
  }

  createNewComment(): void {
    this.comment.push(this.message);
  }

  deleteComment(i: number): void {
    this.comment.splice(i,1)
  }

}
