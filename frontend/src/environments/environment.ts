// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const SERVER_URL = 'http://localhost:8080';
const TEXT_ENDPOINT = SERVER_URL + '/text'; // TODO: remove this line??

export const environment = {
  production: false,
  mockServer: true,
  serverUrl: SERVER_URL,
  activeGameEndpoint: () => `${SERVER_URL}/active`,
  createGameEndpoint: () => SERVER_URL,
  startGameEndpoint: (id: number) => `${SERVER_URL}/${id}/start`,
  remixEndpoint: (id: number, level: number) =>
    `${SERVER_URL}/${id}/remix/${level}`,
  saveGameEndpoint: () => SERVER_URL,
  checkWordsEndpoint: (id: number) => `${SERVER_URL}/${id}/check`,
  cancelGameEndpoint: (id: number) => `${SERVER_URL}/${id}/cancel`,
  googleLoginEndpoint: () => SERVER_URL + '/login/google',
  refreshTokenEndpoint: () => SERVER_URL + '/login/refresh-token',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
