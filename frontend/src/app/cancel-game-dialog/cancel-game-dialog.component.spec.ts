import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelGameDialogComponent } from './cancel-game-dialog.component';

describe('CancelGameDialogComponent', () => {
  let component: CancelGameDialogComponent;
  let fixture: ComponentFixture<CancelGameDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CancelGameDialogComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelGameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
