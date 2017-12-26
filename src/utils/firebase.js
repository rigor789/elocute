import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyAUfOahJXp1Q5Z0JMzUDdRoqCRAaU6fxao',
  authDomain: 'elocuteme.firebaseapp.com',
  databaseURL: 'https://elocuteme.firebaseio.com',
  projectId: 'elocuteme',
  storageBucket: 'elocuteme.appspot.com',
  messagingSenderId: '262790300546',
};

//export const fbconfig = config;
export const connection = firebase.initializeApp(config);
export const db = connection.database();
