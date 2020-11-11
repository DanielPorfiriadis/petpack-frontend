import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostService } from '../post.service';
import { mimeType } from "./mime-type.validator";

@Component({
  selector: 'app-feedview',
  templateUrl: './feedview.component.html',
  styleUrls: ['./feedview.component.css'],
})
export class FeedviewComponent implements OnInit {

  constructor(public postsService: PostService, public route: ActivatedRoute){}
  
  form: FormGroup;
  enteredContent= '';
  totalPosts = 0;
  private mode= 'create';
  private postId: string;
  imagePreview: string;
  isLoading = false;
  post: Post;
  private postsSub: Subscription;
  posts: Post [] = [];
  postsPerPage = 2;
  currentPage=1;

  ngOnInit(): void {
    this.form = new FormGroup ({
      content: new FormControl(null, {
        validators: [Validators.required],
        updateOn: "submit"}),
        image: new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]
        })      
    });
    this.route.paramMap.subscribe((paraMap: ParamMap) => {
      if(paraMap.has('postId')){
        this.mode= 'edit';
        this.postId = paraMap.get('postId');
        this.isLoading = true;
        this.postsService.getPost(this.postId)
            .subscribe(postData => {
                this.isLoading = false;
                this.post = { 
                    id: postData._id,
                    content: postData.content,
                    imagePath: postData.imagePath,
                    creator: postData.creator
                };
                this.form.setValue({
                    content: this.post.content,
                    image: this.post.imagePath
                 });
            });
    } else{
        this.mode = 'create';
        this.postId = null;
    }
    })
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((postsData: {posts: Post[], postCount: number}) =>{
          this.isLoading = false;
          this.posts = postsData.posts;
          this.totalPosts = postsData.postCount;
      });
  }

  onSavePost() {
    if(this.form.invalid){
            return;
    }
    this.isLoading = true;

    this.postsService.addPost( this.form.value.content, this.form.value.image);

    this.form.reset();
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
  }

}
