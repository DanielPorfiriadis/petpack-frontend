import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent implements OnInit {

  currentTime: string;

  constructor() { }

  ngOnInit(): void {
    const date = new Date();
		this.currentTime = `${date.getHours()}:${date.getMinutes()}`
  }

}
