import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reactions',
  templateUrl: './reactions.component.html',
  styleUrls: ['./reactions.component.css']
})
export class ReactionsComponent implements OnInit {

  emojiList: string[];
  showEmojis = false;

  constructor() { }

  ngOnInit(): void {
    this.emojiList = ['like', 'love', 'wow', 'haha', 'sad', 'angry'];
  }

  toggleShow() {
    this.showEmojis = !this.showEmojis;
  }

  emojiPath(emoji) {
    return `assets/emoji/${emoji}.png`
  }

}
