import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { PetData } from '../../auth/pet.model';
import { PetService } from '../../auth/pet.service';

@Component({
  selector: 'app-petmini',
  templateUrl: './petmini.component.html',
  styleUrls: ['./petmini.component.css']
})
export class PetminiComponent implements OnInit, OnDestroy{
  username: string;
  pets: PetData[] = [];
  private petsSub: Subscription;
  totalPets = 0;

  constructor( public authService: AuthService, public petService: PetService ) {}

  ngOnInit(){
    this.username = this.authService.getUserName();
    this.petService.getUserPets(this.username);
    this.petsSub = this.petService.getPetsUpdateListener()
        .subscribe((petsData: {pets: PetData[], petsCount: number}) =>{
            this.pets = petsData.pets;
            this.totalPets = petsData.petsCount;
            console.log(this.pets);
        });
  }

  ngOnDestroy(){
    this.petsSub.unsubscribe();
  }

}
