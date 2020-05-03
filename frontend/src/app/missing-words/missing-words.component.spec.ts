import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingWordsComponent } from './missing-words.component';

describe('MissingWordsComponent', () => {
  let component: MissingWordsComponent;
  let fixture: ComponentFixture<MissingWordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissingWordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissingWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
