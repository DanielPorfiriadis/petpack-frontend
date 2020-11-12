import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from '../feed-page/post.model';
import { mimeType } from "../feed-page/feedview/mime-type.validator";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  form: FormGroup;
  message: string = "";
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

  // User posts check, έλεγχος των ποστ για να μπουν στο προφιλ
  // https://www.codementor.io/@jimohhadi/angular-validators-with-conditional-validation-in-reactive-forms-pj5z7gsq5

  // this.setUserCategoryValidators();
 
  //-----------------------------------

  // setUserCategoryValidators() {
  //   const institutionControl = this.form.get('institution');

  //   this.form.get('userName').valueChanges
  //     .subscribe(userCategory => {

  //       if (userCategory === 'user.UserName') {
  //         institutionControl.setValidators([Validators.required]);
  //       }

  //       institutionControl.updateValueAndValidity();

  //     });
  // }
 


}
