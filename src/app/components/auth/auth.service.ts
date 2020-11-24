import { Injectable, Output } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject, Observable } from "rxjs";

import { LoginData } from "./login-data.model";
import { UserData } from "./user-data.model";
import { RegisterData } from "./register-data.model";
import { catchError, map } from 'rxjs/operators';

export interface Username {
  username: string;
}
@Injectable({ providedIn: "root" })
export class AuthService {
  Credentials = true;
  private isAuthenticated = false;
  private token: string;
  private userId: string;
  private userName: string;
  private fetchedUsernames: String[] =[];
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();
  private userUpdated= new Subject< { user: RegisterData} >();
  private userUpdateDataSuccessfully=false;

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    this.getAuthData();
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getUserListener() {
    return this.userUpdated.asObservable();
  }

  getUserId() {
    return this.userId;
  }

  getUserName(){
    return this.userName;
  }

  getUserInfo(id: string){
    return this.http.get<{ 
      _id: string; 
      userName: string; 
      firstName: string; 
      email: string; 
      lastName: string; 
      imagePath: string; }>("http://localhost:3000/api/users/" +id);
  }

  getUsernames(){
    let usernames: Username[]=[];
    this.http.get<{message: string, usernameArray: string[]}>("http://localhost:3000/api/users")
    .subscribe(users =>{
      console.log(users);
      let usernamesArray = users.usernameArray;
      usernamesArray.forEach(element => {
        usernames.push({username: element});
      });
    });
    return usernames;
  }

  createUser(firstName: string, lastName: string, userName: string, email: string, password: string, image: File) {
    const regData = new FormData();
    regData.append("firstName", firstName);
    regData.append("lastName", lastName);
    regData.append("userName", userName);
    regData.append("password", password);
    regData.append("email", email);
    regData.append("image", image);
    this.http
      .post("http://localhost:3000/api/users/signup", regData)
      .subscribe(response => {
        this.router.navigate(["/login"]);
      });
  }
  
  updateUser(firstName: string, lastName: string, userName: string, email: string, password: string, image: File, imagePath) {
    const regData = new FormData();
    regData.append("firstName", firstName);
    regData.append("lastName", lastName);
    regData.append("userName", userName);
    regData.append("password", password);
    regData.append("email", email);
    if(image){
      regData.append("image", image);
    }else{regData.append("imagePath", imagePath);}

    this.http.put<{message: string, status: number}>("http://localhost:3000/api/users/update/"+this.userId, regData)
      .subscribe(response=>{
        if(response.status==200){
          this.userUpdateDataSuccessfully=true;
        } else{
          this.userUpdateDataSuccessfully=false;
        }
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
          return false;
        }
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(["/settings"]);
      })
  }
  
  login(username: string, password: string) {
    const loginData: LoginData = { userName: username, password: password };
    this.http
      .post<{ token: string; expiresIn: number, userId: string, userName: string}>(
        "http://localhost:3000/api/users/login",
        loginData,
      )
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        this.Credentials = true;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.userId = response.userId;
          this.userName = response.userName;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          console.log(expirationDate);
          this.saveAuthData(token, expirationDate, this.userId, this.userName);
          this.router.navigate(["/feed-page"]);
        }
      }, err => { this.printError() });
  }

  
  printError() {
    this.Credentials = false;
  };

  

  getCredentials() { return this.Credentials; };

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.userName = authInformation.userName;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.userId ="";
    this.userName ="";
    this.router.navigate(["/landing-page"]);
  }

  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string, userName: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId", userId);
    localStorage.setItem("userName", userName);
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
      userName: userName
    }
  }
}