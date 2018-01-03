// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router/routes';
import Vuetify from 'vuetify';
import { store } from './store/store';
import firebase from 'firebase';
import admin from 'firebase-admin';
import firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
//import { isNonNullObject } from '@firebase/util';

const config = {
  apiKey: 'AIzaSyAUfOahJXp1Q5Z0JMzUDdRoqCRAaU6fxao',
  authDomain: 'elocuteme.firebaseapp.com',
  databaseURL: 'https://elocuteme.firebaseio.com',
  projectId: 'elocuteme',
  storageBucket: 'elocuteme.appspot.com',
  messagingSenderId: '262790300546',
};

const serviceAccount = require('./assets/admin/elocute-service-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://elocuteme.firebaseio.com',
});

Vue.config.productionTip = false;

Vue.use(Vuetify, {
  theme: {
    primary: '#F5D1E9',
    accent: '#131426',
    secondary: '#66A59A',
    info: '#A5DAD2',
    tile: '#F3F3F3',
  },
});

firebase.initializeApp(config);
firebase.auth().onAuthStateChanged(function(user) {
  new Vue({
    el: '#app',
    store: store,
    router,
    render: h => h(App),
  });
});
