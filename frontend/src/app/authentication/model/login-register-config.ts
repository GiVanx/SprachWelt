export enum Mode {
  LOGIN,
  REGISTER,
}

export class LoginRegisterOverlayConfig {
  mode: Mode;
  afterSuccessAction: any;
  showNoAccountYet: boolean;
  showAlreadyHaveAnAccount: boolean;
}
