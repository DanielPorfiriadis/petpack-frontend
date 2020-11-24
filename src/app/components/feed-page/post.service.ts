import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map, timestamp } from "rxjs/operators";
import { Post } from './post.model';
import { Router } from "@angular/router";
import { timeStamp } from 'console';

@Injectable({ providedIn: "root" })
export class PostService {

  private posts: Post[] = [];
  private postsUpdated = new Subject<{ posts: Post[]; postCount: number }>();

  constructor(private http: HttpClient, private router: Router) { }

  getPosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "http://localhost:3000/api/posts" + queryParams)
      .pipe(
        map(postData => {
          return {
            posts: postData.posts.map(post => {
              return {
                content: post.content,
                id: post._id,
                imagePath: post.imagePath,
                creator: post.creator,
                creatorUsername: post.creatorUsername,
                timeStamp: post.timeStamp,
                postAvatar: post.postAvatar
              };
            }),
            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }

  getPostsByUsername(postsPerPage: number, currentPage: number, username: string) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}&username=${username}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "http://localhost:3000/api/posts/users" + queryParams)
      .pipe(
        map(postData => {
          return {
            posts: postData.posts.map(post => {
              return {
                content: post.content,
                id: post._id,
                imagePath: post.imagePath,
                creator: post.creator,
                creatorUsername: post.creatorUsername,
                postAvatar: post.postAvatar
              };
            }),
            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        console.log(transformedPostData);
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    return this.http.get<{ _id: string; content: string; imagePath: string; creator: string; creatorUsername: string; timeStamp: Date; postAvatar: string; }>("http://localhost:3000/api/posts/" + id);
  }

  addPost(content: string, image: File, timeStamp: Date, postAvatar: string) {
    const postData = new FormData();
    postData.append("content", content);
    postData.append("image", image);
    postData.append("postAvatar", postAvatar);
    postData.append("timeStamp", timeStamp.toISOString());
    this.http.post<{ message: string; post: Post }>("http://localhost:3000/api/posts/", postData)
      .subscribe(responseData => {
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
          return false;
        }
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(["/feed-page"]);
      })
  }

  updatePost(id: string, content: string, image: File | string) {
    let postData: Post | FormData;
    if (typeof image === "object") {
      postData = new FormData();
      postData.append("id", id);
      postData.append("content", content);
      postData.append("image", image);
    } else {
      postData = {
        id: id,
        content: content,
        imagePath: image,
        creator: null,
        creatorUsername: null,
        timeStamp: null,
        postAvatar:null
      };
    }
    this.http
      .put("http://localhost:3000/api/posts/" + id, postData)
      .subscribe(responseData => {
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
          return false;
        }
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(["/feed-page"]);
      })
  }

  deletePost(postId: string) {
    return this.http
      .delete("http://localhost:3000/api/posts/" + postId)
      .subscribe(response => {
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
          return false;
        }
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(["/feed-page"]);
      })
  }


  //new, for Profile
  addPostProfile(content: string, image: File, timeStamp: Date) {
    const postData = new FormData();
    postData.append("content", content);
    postData.append("image", image);
    postData.append("timeStamp", timeStamp.toISOString());
    this.http.post<{ message: string; post: Post }>("http://localhost:3000/api/posts/", postData)
      .subscribe(responseData => {
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
          return false;
        }
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(["/profile"]);
      })
  }

  updatePostProfile(id: string, content: string, image: File | string) {
    let postData: Post | FormData;
    if (typeof image === "object") {
      postData = new FormData();
      postData.append("id", id);
      postData.append("content", content);
      postData.append("image", image);
    } else {
      postData = {
        id: id,
        content: content,
        imagePath: image,
        creator: null,
        creatorUsername: null,
        timeStamp: null,
        postAvatar: null
      };
    }
    this.http
      .put("http://localhost:3000/api/posts/" + id, postData)
      .subscribe(responseData => {
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
          return false;
        }
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(["/profile"]);
      })
  }

  deletePostProfile(postId: string) {
    return this.http
      .delete("http://localhost:3000/api/posts/" + postId)
      .subscribe(response => {
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
          return false;
        }
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(["/profile"]);
      })
  }

  //end of Profile

}
