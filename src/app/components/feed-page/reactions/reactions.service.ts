import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from "rxjs/operators";
import { Reaction } from './reactions.model';
import { Router } from "@angular/router";


@Injectable({ providedIn: "root" })
export class ReactionService {

  constructor(private http: HttpClient, private router: Router) { }

  getReactions() {
    return this.http.get<{emote}>("http://localhost:3000/api/reactions/posts");

  }
  postReaction(userId: string, postId: string, emote: string) {
    let reaction = { emote: emote, userId: userId, postId: postId };
    return this.http.post<{ userId; postId }>("http://localhost:3000/api/reactions/addReaction", reaction).subscribe(response => {
      console.log(response);
    });

  }

  deleteReaction(userId: string, postId: string, emote: string) {
    let reaction = { emote: emote, userId: userId, postId: postId };
    return this.http.post<{ userId; postId; emote }>("http://localhost:3000/api/reactions/deleteReaction",reaction).subscribe(response => {
      console.log(response);
  });

   

  }
}

 /*   getAllReactions(){
      this.http.get<{ userId: string; postId: string; emote: string; }>(
        "http://localhost:3000/api/reactions/posts/" )
        .pipe(
          map(reactions => {
            return {
              emote: reactions.emote.map(reactions => {
                return {
                  postId: reactions.postId,
                  id: reactions._id,
                  userId: reactions.userId,
                  emote: reactions.emote
                  
                };
              }),
             
            };
          })
        )
        .subscribe(transformedReactionData => {

          this.getAllReactions = transformedReactionData.emote;
          console.log(this.getAllReactions);
          this.reactionsUpdated.next({
            pets: [...this.pets],
            petsCount: transformedPetData.totalPets
          });
        });
    }
    getPetsUpdateListener(){
      return this.petsUpdated.asObservable();
    }
*/

