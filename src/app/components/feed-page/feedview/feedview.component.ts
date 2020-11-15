import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

import { Post } from '../post.model';
import { PostService } from '../post.service';
import { mimeType } from "./mime-type.validator";

@Component({
  selector: 'app-feedview',
  templateUrl: './feedview.component.html',
  styleUrls: ['./feedview.component.css'],
})
export class FeedviewComponent implements OnInit, OnDestroy {

  constructor(public postsService: PostService, public route: ActivatedRoute, public authService: AuthService){}
  
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
  postsPerPage = 200;
  currentPage=1;
  userId: string;
  userIsAuthenticated = false;
  private authStatusSub: Subscription;

  ngOnInit(): void {

        this.isLoading = true;
        this.userId = this.authService.getUserId();
        this.postsService.getPosts(this.postsPerPage, this.currentPage);
        this.postsSub = this.postsService.getPostUpdateListener()
            .subscribe((postsData: {posts: Post[], postCount: number}) =>{
                this.isLoading = false;
                this.posts = postsData.posts;
                this.totalPosts = postsData.postCount;
            });
        this.userIsAuthenticated = this.authService.getIsAuth();
        this.authStatusSub =this.authService
        .getAuthStatusListener()
        .subscribe(isAuthenticated => {
            this.userIsAuthenticated = isAuthenticated;
            this.userId = this.authService.getUserId();
        });

    this.form = new FormGroup({
      content : new FormControl(null, {
          validators: [Validators.required], 
          updateOn: "change"}),
          image: new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]
          })
    });
    this.route.paramMap.subscribe((paraMap: ParamMap) =>{
      if (paraMap.has('postId')){
          this.mode = 'edit';
          this.postId = paraMap.get('postId');
          this.isLoading = true;
          this.postsService.getPost(this.postId)
              .subscribe(postData => {
                  this.isLoading = false;
                  this.post = { 
                      id: postData._id,
                      content: postData.content,
                      imagePath: postData.imagePath,
                      creator: postData.creator,
                      creatorUsername: postData.creatorUsername
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
    });



  }

    
  onSavePost() {
    if(this.form.invalid){
            return;
    }
    this.isLoading = true;
    if (this.mode === 'create'){
        this.postsService.addPost( 
            this.form.value.content,
            this.form.value.image);
    } else {
        this.postsService.updatePost(
            this.postId, 
            this.form.value.image, 
            this.form.value.content
            );
    }
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


  deletePost(postId: string): void {
    this.isLoading = true;
    this.postsService.deletePost(postId);
  }

  ngOnDestroy(){
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
