import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from '../post.model';
import { mimeType } from "./mime-type.validator";

@Component({
  selector: 'app-feedview',
  templateUrl: './feedview.component.html',
  styleUrls: ['./feedview.component.css'],
})
export class FeedviewComponent implements OnInit {

  form: FormGroup;
  message: string = "123";
  image:any;
  imagePreview: string;
  isLoading = false;

  items: number[] = [];
  posts: Post[] =[];
  post: Post;
  constructor() {
    for (let i = 0; i < 5; i++) {
      this.items.push(i);
    }
  }

  ngOnInit(): void {
    this.form = new FormGroup ({
      content: new FormControl(null, {
        validators: [Validators.required],
        updateOn: "change"}),
      image: new FormControl(null)
      
    })
  }

  createNewPost(): void {
    this.posts.push(this.post = {
      id: null,
      content: this.message,
      imagePath: null,
      creator: null
    });
  }

  onSavePost() {

}
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
        this.imagePreview = (reader.result as string);
    };
    reader.readAsDataURL(file);
}


  deletePost(i: number): void {
    this.posts.splice(i,1)
  }

}
