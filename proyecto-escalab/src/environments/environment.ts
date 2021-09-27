// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  hostAuthApi: 'https://identitytoolkit.googleapis.com/v1/accounts:',
  apiKey: 'AIzaSyAQkQFTMbIFWVeB09ASukDsaaw5L8zLyv0',
  hostFirebase: 'https://postservice-d4cdb-default-rtdb.firebaseio.com',
  firebase: {
    apiKey: 'AIzaSyAQkQFTMbIFWVeB09ASukDsaaw5L8zLyv0',
    authDomain: 'postservice-d4cdb.firebaseapp.com',
    databaseURL: 'https://postservice-d4cdb-default-rtdb.firebaseio.com',
    projectId: 'postservice-d4cdb',
    storageBucket: 'postservice-d4cdb.appspot.com',
    messagingSenderId: '277407333804',
    appId: '1:277407333804:web:fe410efbb2a439941a4e09',
    measurementId: 'G-J6VY26K97J'
  }

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
