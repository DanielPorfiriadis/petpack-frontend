import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { PetData } from '../../auth/pet.model';
import { PetService } from '../../auth/pet.service';

@Component({
  selector: 'app-petmini',
  templateUrl: './petmini.component.html',
  styleUrls: ['./petmini.component.css']
})
export class PetminiComponent implements OnInit{
  username: string;
  pets: PetData[] = [];

  constructor( public authService: AuthService, public petService: PetService ) {}

  ngOnInit(){
    this.username = this.authService.getUserName();
    this.petService.getUserPets(this.username);
  }

}
