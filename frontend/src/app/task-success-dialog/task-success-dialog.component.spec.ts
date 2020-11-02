import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskSuccessDialogComponent } from './task-success-dialog.component';

describe('TaskSuccessDialogComponent', () => {
  let component: TaskSuccessDialogComponent;
  let fixture: ComponentFixture<TaskSuccessDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaskSuccessDialogComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskSuccessDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
