import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { timeStamp } from 'console';
import { Subscription } from 'rxjs';
import { timestamp } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service';
import { RegisterData } from '../../auth/register-data.model';
import { UserData } from '../../auth/user-data.model';

import { Post } from '../post.model';
import { PostService } from '../post.service';
import { mimeType } from "./mime-type.validator";

@Component({
  selector: 'app-feedview',
  templateUrl: './feedview.component.html',
  styleUrls: ['./feedview.component.css'],
})
export class FeedviewComponent implements OnInit, OnDestroy {
    

  constructor(public postsService: PostService, public route: ActivatedRoute, public authService: AuthService, private datePipe: DatePipe){}
  
  form: FormGroup;
  enteredContent= '';
  totalPosts = 0;
  private mode= 'create';
  private postId: string;
  imagePreview: string;
  isLoading = false;
  post: Post;
  user: UserData;
  private postsSub: Subscription;
  posts: Post [] = [];
  postsPerPage = 5;
  private searchedUsername
  currentPage=1;
  userPicture='';
  userId: string;
  userIsAuthenticated = false;
  private authStatusSub: Subscription;
  currentDate = new Date();
  endOfPosts = false;
  show = 0;

  ngOnInit(): void {
    this.isLoading = true;
    this.userId = this.authService.getUserId();
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub =this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
          this.userIsAuthenticated = isAuthenticated;
          this.userId = this.authService.getUserId();
      });
    this.authService.getUserInfo(this.userId)
      .subscribe(userData=>{
        this.user = {
          lastName: userData.lastName,
          email: userData.email,
          userName: userData.userName,
          firstName: userData.firstName,
          imagePath: userData.imagePath,
          id: userData._id
        };
        this.userPicture=userData.imagePath;
      })
    this.form = new FormGroup({
      content : new FormControl(null, {
        validators: [Validators.required], 
        updateOn: "change"}),
        image: new FormControl({ asyncValidators: [mimeType]
        })
    });
    this.route.paramMap.subscribe((paraMap: ParamMap) =>{
      if(paraMap.has('username')){
        this.searchedUsername= paraMap.get('username');
        this.postsService.getPostsByUsername(this.postsPerPage, this.currentPage, this.searchedUsername);
        this.postsSub = this.postsService.getPostUpdateListener()
            .subscribe((postsData: {posts: Post[], postCount: number}) =>{
                this.isLoading = false;
                this.posts = postsData.posts;
                this.totalPosts = postsData.postCount;
      });
    } else{
      this.postsService.getPosts(this.postsPerPage, this.currentPage);
      this.postsSub = this.postsService.getPostUpdateListener()
          .subscribe((postsData: {posts: Post[], postCount: number}) =>{
              this.isLoading = false;
              this.posts = postsData.posts;
              this.totalPosts = postsData.postCount;
          });
    }
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
                    creatorUsername: postData.creatorUsername,
                    timeStamp: postData.timeStamp,
                    postAvatar: postData.postAvatar
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

    let postCreateDate = new Date();


    this.isLoading = true;
    if ( this.form.value.image != null){
        this.postsService.addPost( 
            this.form.value.content,
            this.form.value.image,
            postCreateDate,
            this.userPicture
            );
    } else {
        this.postsService.addPost(
          this.form.value.content, 
          null,
          postCreateDate,
          this.userPicture
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

calculateTimeDifference(postString:string, currentTime:Date){
  
  var postTime = new Date(postString);
  var difference = currentTime.getTime() -postTime.getTime();
  var differenceInMinutes = difference/(1000*60);
  var differenceInSeconds = difference/1000;


  if(differenceInMinutes >= 1440){
    if(Math.floor(differenceInMinutes/1440)===1){
      return "Yesterday";
    }
    return Math.floor(differenceInMinutes/1440) +" Days ago";
  }
  else if(differenceInMinutes < 1440 && differenceInMinutes >= 60){
    if(Math.floor(difference/(1000*60*60)) === 1){
      return Math.floor(difference/(1000*60*60)) + " Hour ago";
    }
      return Math.floor(difference/(1000*60*60)) + " Hours ago";
  }
  else if(differenceInSeconds >=  60 && differenceInMinutes <= 60){
    if(Math.floor(difference/(1000*60))===1){
      return Math.floor(difference/(1000*60)) + " Minute ago"
    }
    return Math.floor(difference/(1000*60)) + " Minutes ago"
  }
  else if(differenceInSeconds <  60 && differenceInSeconds >  5){
    return Math.floor(difference/(1000)) + " Seconds ago"
  }
  else{
    return "Post just added"
  }
}


  ngOnDestroy(){
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

  @HostListener("window:scroll", ["$event"])

  onWindowScroll() {
    //In chrome and some browser scroll is given to body tag
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight * (5/6);
    let current = document.documentElement.scrollTop;
    // pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
    if (pos >= max) {
      console.log("total posts:"+this.totalPosts +" & postPerPage:" + this.postsPerPage);
      if (this.totalPosts > this.postsPerPage) {
        this.isLoading = true;
        this.postsPerPage += 5;
        this.ngOnInit();
        document.documentElement.scrollTop = current;
      }
      else {
        this.endOfPosts = true;
        // this.posts = this.posts.concat(this.posts);
      }
    }
  }
}