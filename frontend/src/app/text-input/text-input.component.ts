import { Component, OnInit } from '@angular/core';
import { TextStore } from '../state/text.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.less'],
})
export class TextInputComponent implements OnInit {
  text: string;

  constructor(private textStore: TextStore, private router: Router) {}

  ngOnInit(): void {
    console.log('text input component');
  }

  onPlay() {
    console.log('ON PLAY', this.text);
    // TODO: change this length logic
    if (this.text.length > 0) {
      this.textStore.addTextRequest(this.text);
      this.router.navigate(['/text-fill']);
    }
  }
}
