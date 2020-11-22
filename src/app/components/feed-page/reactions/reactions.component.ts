import { Component, OnInit, Injectable, Input } from '@angular/core';
import { ReactionService } from './reactions.service';
@Component({
  selector: 'app-reactions',
  templateUrl: './reactions.component.html',
  styleUrls: ['./reactions.component.scss']
})



export class ReactionsComponent implements OnInit {
  /*selectedEmote: string;*/
  emojiList: string[];
  showEmojis = false;
  reactionCount: any;

  selectedEmote = 'like';

  

  ngOnInit(): void {
    this.emojiList = ['like', 'love', 'wow', 'haha', 'sad', 'angry'];
  }
/*  constructor(private reactionSvc: ReactionService) { }

  countReactions(postId) {
    return this.reactionSvc.countReactions(postId);
  }
*/
  react(x) {
    this.selectedEmote = x; 
  }

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

