import { Component, OnInit, Injectable } from '@angular/core';
import { ReactionService } from './reactions.service';
@Component({
  selector: 'app-reactions',
  templateUrl: './reactions.component.html',
  styleUrls: ['./reactions.component.scss']
})



export class ReactionsComponent implements OnInit {

  emojiList: string[];
  showEmojis = false;

  

  ngOnInit(): void {
    this.emojiList = ['like', 'love', 'wow', 'haha', 'sad', 'angry'];
  }
  constructor(private reactionSvc: ReactionService) { }
  react(val) {
      
    } else {
      this.reactionSvc.updateReaction(this.itemId, val)
    }
  }

  toggleShow() {
    this.showEmojis = !this.showEmojis;
  }

  emojiPath(emoji) {
    return `assets/emoji/${emoji}.png`
  }

}

