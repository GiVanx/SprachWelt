import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRegisterComponent } from './login-register-overlay.component';

describe('LoginComponent', () => {
  let component: LoginRegisterComponent;
  let fixture: ComponentFixture<LoginRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginRegisterComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
