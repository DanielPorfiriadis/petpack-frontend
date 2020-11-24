import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

import { PetData } from "./pet.model";
import { map } from 'rxjs/operators';
import { NumberValueAccessor } from '@angular/forms';

@Injectable({ providedIn: "root" })
export class PetService {
    constructor(private http: HttpClient, private router: Router) {}

    private pets: PetData[]=[];
    private petsCount: number;
    private petsUpdated = new Subject<{ pets: PetData[]; petsCount: number }>();
    private petUpdateDataSuccessfully=false;

    createPet(petName: string, species: string, gender: string, ownerUsername: string, petAvatar: File) {
        const petData = new FormData();
        petData.append("ownerUsername", ownerUsername);
        petData.append("petName", petName);
        petData.append("species", species);
        petData.append("gender", gender);
        petData.append("image", petAvatar);
        console.log(petData);
        this.http
          .post("http://localhost:3000/api/pet/add/"+ownerUsername, petData).subscribe(res =>{
              console.log(res);
          });
    }

    updatePet(petData: PetData, petAvatar: File, petImagePreview: string){
        console.log(petData);
        const pet = new FormData();
        pet.append("petName", petData.petName);
        pet.append("_id", petData.id);
        pet.append("species", petData.species);
        pet.append("ownerUsername", petData.ownerUsername);
        pet.append("gender", petData.gender);
        if(petAvatar){
            pet.append("petAvatar", petAvatar);
          }else{pet.append("petImagePreview", petImagePreview);}
        this.http.put<{message: string, status: Number}>("http://localhost:3000/api/pet/update", pet)
            .subscribe(response =>{
                if(response.status==200){
                    this.petUpdateDataSuccessfully=true;
                  } else{
                    this.petUpdateDataSuccessfully=false;
                  }
                  this.router.routeReuseStrategy.shouldReuseRoute = function () {
                    return false;
                  }
                  this.router.onSameUrlNavigation = 'reload';
                  this.router.navigate(["/settings"]);  
            });
    }
    
    getUserPets(username: string){
        this.http.get<{ message: string; pets: any; petsCount: number; }>(
            "http://localhost:3000/api/pet/get/" + username )
            .pipe(
                map(petData=> {
                    return {
                        pets: petData.pets.map(pet => {
                            return{
                                petName: pet.petName,
                                id: pet._id,
                                ownerUsername: pet.ownerUsername,
                                gender: pet.gender,
                                species: pet.species,
                                petAvatar: pet.petAvatar
                            };
                        }),
                        totalPets: petData.petsCount
                    };
                })            
            )
            .subscribe(transformedPetData =>{
                
                this.pets = transformedPetData.pets;
                console.log(this.pets);
                this.petsUpdated.next({
                    pets: [...this.pets],
                    petsCount: transformedPetData.totalPets
                });
            });
    }
    getPetsUpdateListener(){
        return this.petsUpdated.asObservable();
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
