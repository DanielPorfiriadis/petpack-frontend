import { Component, OnInit, Injectable, Input } from '@angular/core';
import { ReactionService } from './reactions.service';
import { Reaction } from './reactions.model';
import { AuthService } from '../../auth/auth.service';
import { MatTooltipModule, TooltipPosition } from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-reactions',
  templateUrl: './reactions.component.html',
  styleUrls: ['./reactions.component.scss']
})





export class ReactionsComponent implements OnInit  {
  @Input() postId: string;
  /*selectedEmote: string;*/
  emojiList: string[];
  emojiName: string[];
  showEmojis = false;
  reactionCount: any;
  previousEmote: '';
  selectedEmote = 'like';
  userData: Reaction;
  emojiText: string;
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);
  emojiFade = true;
  

  ngOnInit(): void {
    this.emojiList = ['like', 'love', 'wow', 'haha', 'sad', 'angry'];
    this.emojiName = ['Pawesome!', 'Love!', 'Wow!', 'Woof!', 'Sad!', 'Grrrr!'];
    
    
  }
  constructor(private reactionSvc: ReactionService, private userSvc: AuthService) { }

  

  react(x) {
    this.selectedEmote = x;
    console.log(this.previousEmote);
    if (this.previousEmote == this.selectedEmote) {

      this.reactionSvc.deleteReaction(this.userSvc.getUserId(), this.postId, x);
      this.previousEmote = null;
      console.log("Delete succesful");
      
      this.emojiText = null;
      this.emojiFade = true;
    }
    else {
      this.reactionSvc.postReaction(this.userSvc.getUserId(), this.postId, x);
      console.log(this.postId);
      this.previousEmote = x;
      console.log("Save succesful");
      let index = this.emojiList.indexOf(x);
      this.emojiText = this.emojiName[index];
      this.emojiFade = false;
    }
  }
/*  hasReactions() {
    this.reactionSvc.getReactions();
    
  }*/

  toggleShow() {
    this.showEmojis = !this.showEmojis;
  }

  neverShow() {
    this.showEmojis = false;
  }

  emojiPath(emoji) {
    return `assets/emoji/${emoji}.png`
  }

}

