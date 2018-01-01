import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import About from '@/components/About';
import Auth from '@/components/Auth';
import TeacherHome from '@/components/TeacherHome';
import ClassroomHome from '@/components/ClassroomHome';
import firebase from 'firebase';

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Home,
    },
    {
      path: '/about',
      name: 'About',
      component: About,
    },
    {
      path: '/auth',
      name: 'Login',
      component: Auth,
    },
    {
      path: '/home',
      name: 'TeacherHome',
      component: TeacherHome,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/classroomhome/:id',
      name: 'ClassroomHome',
      component: ClassroomHome,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !currentUser) next('login');
  else if (!requiresAuth && currentUser) next('home');
  else next();
});

export default router;
