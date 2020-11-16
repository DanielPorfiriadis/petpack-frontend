import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

import { PetData } from "./pet.model";
import { map } from 'rxjs/operators';

@Injectable({ providedIn: "root" })
export class PetService {
    constructor(private http: HttpClient, private router: Router) {}

    private pets: PetData[]=[];
    private petsCount: number;
    private petsUpdated = new Subject<{ pets: PetData[]; petCount: number }>();

    createPet(petName: string, species: string, gender: string, ownerUsername: string) {
        const petData: PetData = { petName: petName, species: species, gender: gender, ownerUsername: null, id:null};
        console.log(petData);
        this.http
          .post("http://localhost:3000/api/pet/add/"+ownerUsername, petData).subscribe(res =>{
              console.log(res);
          });
    }
    getUserPets(username: string){
        this.http.get<{ message: string; pets: any; petsCount: number; }>(
            "http://localhost:3000/api/pet/get/" + username )
            .pipe(
                map(responseData=> {
                    return{
                        pets: responseData.pets.map(pet =>{
                            return{
                                petName: responseData.pets.petName,
                                ownerUsername: responseData.pets.ownerUsername,
                                gender: responseData.pets.gender,
                                species: responseData.pets.species,
                                id: responseData.pets._id,
                            };
                        }),
                        petsCount: responseData.petsCount
                    };
                })              
            )
            .subscribe(transformedPostData =>{
                
                this.pets = transformedPostData.pets;
                this.petsUpdated.next({
                    pets: [...this.pets],
                    petCount: transformedPostData.petsCount
                });
            });
    }
}
  
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
