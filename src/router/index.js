import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import About from '@/components/About';
import Auth from '@/components/Auth';
import TeacherHome from '@/components/TeacherHome';
import ClassroomHome from '@/components/ClassroomHome';

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
      path: '/home',
      name: 'TeacherHome',
      component: TeacherHome,
    },
    {
      path: '/classroomhome/:id',
      name: 'ClassroomHome',
      component: ClassroomHome,
    },
  ],
});
