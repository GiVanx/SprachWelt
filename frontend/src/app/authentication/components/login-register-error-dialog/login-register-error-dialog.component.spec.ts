import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRegisterErrorDialogComponent } from './login-register-error-dialog.component';

describe('LoginRegisterErrorDialogComponent', () => {
  let component: LoginRegisterErrorDialogComponent;
  let fixture: ComponentFixture<LoginRegisterErrorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginRegisterErrorDialogComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginRegisterErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
