export interface LoginProvider {
  authenticate(): Promise<string>;
}
