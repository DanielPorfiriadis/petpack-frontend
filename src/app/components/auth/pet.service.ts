// import { Injectable } from "@angular/core";
// import { HttpClient } from "@angular/common/http";
// import { Router } from "@angular/router";
// import { Subject } from "rxjs";

// import { PetData } from "./pet.model";

// export interface Pet {
//     petName: string;
//     species: string;
//     gender: string;
// }

// @Injectable({ providedIn: "root" })
// export class PetService {
//   private isAuthenticated = false;
//   private token: string;
//   private userId: string;
//   private userName: string;
//   private fetchedUsernames: String[] =[];
//   private tokenTimer: any;
//   private authStatusListener = new Subject<boolean>();

//   constructor(private http: HttpClient, private router: Router) {}

//   getToken() {
//     this.getAuthData();
//     return this.token;
//   }

//   getIsAuth() {
//     return this.isAuthenticated;
//   }

//   getAuthStatusListener() {
//     return this.authStatusListener.asObservable();
//   }

//   getpetName() {
//     return this.petName;
//   }

//   getPetnames(){

//     let petnames: Petname[]=[];
//     this.http.get<{message: string, petnameArray: string[]}>("http://localhost:3000/api/user/retrieve")
//     .subscribe(users =>{
//       let petnamesArray = pets.petnameArray;
//       petnamesArray.forEach(element => {
//         console.log(element);
//         petnames.push({petname: element});
//       });
//     })
//     return petnames;
//   }

// }
