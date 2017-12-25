// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import Vuetify from 'vuetify';
import firebase from 'firebase';
import { config } from './utils/firebaseConfig';
import firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

Vue.config.productionTip = false;

Vue.use(router);

Vue.use(Vuetify, {
  theme: {
    primary: '#F5D1E9',
    accent: '#131426',
    secondary: '#66A59A',
    info: '#A5DAD2',
    tile: '#F3F3F3',
  },
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  created() {
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$router.push('/success');
      } else {
        this.$router.push('/');
      }
    });
  },
  template: '<App/>',
  components: { App },
});
