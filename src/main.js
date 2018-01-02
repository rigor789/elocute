// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import routes from './router/routes';
import Vuetify from 'vuetify';
import { store } from './store/store';
import Firebase from 'firebase';
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

Firebase.initializeApp(config);

//Vue.config.productionTip = false;

Vue.use(VueRouter);

const router = new VueRouter({
  routes: routes,
  mode: 'history',
});

Vue.use(Vuetify, {
  theme: {
    primary: '#F5D1E9',
    accent: '#131426',
    secondary: '#66A59A',
    info: '#A5DAD2',
    tile: '#F3F3F3',
  },
});

router.beforeEach((to, from, next) => {
  const currentUser = Firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('login');
  else if (!requiresAuth && currentUser) next('home');
  else next();
});

Firebase.auth().onAuthStateChanged(function(user) {
  new Vue({
    el: '#app',
    store: store,
    router: router,
    render: h => h(App),
  });
});
