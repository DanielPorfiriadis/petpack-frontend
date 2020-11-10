import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-feedview',
  templateUrl: './feedview.component.html',
  styleUrls: ['./feedview.component.css'],
})
export class FeedviewComponent implements OnInit {

  message: any;
  image: any;

  items: number[] = [];
  posts: any[] = [];

  file: File;
  fileName: string;

  url;
  urls: any[]=[];
  msg = "";


  constructor() {
    for (let i = 0; i < 5; i++) {
      this.items.push(i);
    }
  }

  ngOnInit(): void {
   
  }

  aButton(eikona): void {
    this.posts.push(eikona);
  }

  createNewPost(): void {
    if (this.message) { this.posts.push(this.message); }/* else if(this.url) {
      this.posts.push('');
    }*/
    if (this.url) {
      this.urls.push(this.url);
      /*this.posts.push(this.url)*/
    } else {
      this.urls.push('');
    }
    this.posts.reverse();
    this.urls.reverse();
  }

  deletePost(i: number): void {
    this.posts.splice(i,1);
  }

  fileUpload(file): void {
    this.file = file.files[0];
    this.fileName = file.files[0].name;
  }

  selectFile(event) {
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      this.msg = 'You must select an image';
      return;
    }

    var mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.msg = "Only images are supported";
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.msg = "";
      this.url = reader.result;
      
    }
  }


}
