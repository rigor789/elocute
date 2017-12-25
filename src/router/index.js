import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import About from '@/components/About';
import Auth from '@/components/Auth';
import TeacherHome from '@/components/TeacherHome';

Vue.use(Router);

export default new Router({
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
      path: '/success',
      name: 'TeacherHome',
      component: TeacherHome,
    },
  ],
});
