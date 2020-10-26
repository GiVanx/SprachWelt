import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGameDialogComponent } from './new-game-dialog.component';

describe('NewGameDialogComponent', () => {
  let component: NewGameDialogComponent;
  let fixture: ComponentFixture<NewGameDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewGameDialogComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewGameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
