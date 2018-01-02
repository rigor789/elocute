import Home from '@/components/Home';
import About from '@/components/About';
import Auth from '@/components/Auth';
import TeacherHome from '@/components/TeacherHome';
import ClassroomHome from '@/components/ClassroomHome';

export const routes = [
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
];
export default routes;
