import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  currentDate = new Date();
  currentDate2:Date;
  date2 :any;
  difference:any;
  myDate: any;
  constructor(private datePipe: DatePipe) { 
    console.log(this.currentDate);
    this.currentDate2 = new Date("2020-11-18T07:01:04.753Z");
    console.log(this.currentDate2);
    this.difference =this.currentDate.getTime() - this.currentDate2.getTime();
    console.log(Math.floor(this.difference/(1000*60*60)));
  }

  ngOnInit(): void {

  }

}