import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Mode } from '../../model/login-register-config';

export class ErrorDialogData {
  mode: Mode;
  error: string;
}

@Component({
  selector: 'app-login-register-error-dialog',
  templateUrl: './login-register-error-dialog.component.html',
  styleUrls: ['./login-register-error-dialog.component.less'],
})
export class LoginRegisterErrorDialogComponent implements OnInit {
  title: string;
  action: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ErrorDialogData,
    public dialogRef: MatDialogRef<LoginRegisterErrorDialogComponent>
  ) {
    if (data.mode === Mode.LOGIN) {
      this.title = 'Login';
      this.action = 'Register';
    } else {
      this.title = 'Registration';
      this.action = 'Login';
    }
    this.title += ' failed';
  }

  onOkClick() {
    this.dialogRef.close();
  }

  ngOnInit(): void {}
}
