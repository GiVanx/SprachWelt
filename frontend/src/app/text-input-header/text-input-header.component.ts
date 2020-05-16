import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-text-input-header',
  templateUrl: './text-input-header.component.html',
  styleUrls: ['./text-input-header.component.less'],
})
export class TextInputHeaderComponent implements OnInit {
  @Output() onPlay: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onPlayButtonClick() {
    this.onPlay.emit();
  }
}
