import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.less'],
})
export class AppLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    console.log('app layout');
  }
}
