import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './app-footer.component.html',
  styleUrls: ['./app-footer.component.scss'],
})
export class AppFooterComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onContactClick() {
    this.router.navigate(['contact']);
  }
}
