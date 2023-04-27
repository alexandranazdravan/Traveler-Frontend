import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
          path: '/admin',
          name: 'admin',
          component:  () => import('../components/admin.vue')
        },
        {
          path: '/about',
          name: 'about',
          component: () => import('../components/about.vue'),
        },
        {
          path: '/',
          name: 'home',
          component: () => import('../components/home.vue'),
        },
        {
          path: '/login',
          name: 'login',
          component: () => import('../components/login.vue'),
        },
        {
          path: '/register',
          name: 'register',
          component:() => import('../components/register.vue')
        },
        {
          path: '/forgotpass',
          name: 'forgotpass',
          component:() => import('../components/forgotpass.vue')
        },
        {
          path: '/dashboard',
          name: 'dashboard',
          component:() => import('../components/mainpage.vue')
        },
        {
          path: '/resetpass',
          name: 'resetpass',
          component:() => import('../components/resetpass.vue')
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import('../components/userprofile.vue'),
        },
        {
          path: '/wishlist',
          name: 'wishlist',
          component: () => import('../components/wishlist.vue'),
        },
      ]
})


router.beforeEach((to, from, next) => {
  if (to.path === '/admin') {
    const cookieValue = document.cookie.match('(^|;)\\s*' + 'loggedin' + '\\s*=\\s*([^;]+)');
    const cookie = cookieValue ? cookieValue.pop() : '';
    const isAuthenticated = cookie === "" ? false : true; 

    if (isAuthenticated) {
      axios.get('http://localhost:80/Traveler/admin', {
        withCredentials: true
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      })
      .then(response => {
        if(response.data['isAdmin'] == false) {
          router.push('/login');
        }
        else {
          next();
        }
      })
      .catch(error => {
        this.errorMessage = 'Something went wrong';
      });
    } 
    else {
      router.push('/login');
    }
  } 
  else if (to.path === '/login' || to.path === '/register') {
    const cookieValue = document.cookie.match('(^|;)\\s*' + 'loggedin' + '\\s*=\\s*([^;]+)');
    const cookie = cookieValue ? cookieValue.pop() : '';
    const isAuthenticated = cookie === "" ? false : true; 

    if (isAuthenticated) {
      router.push('/dashboard');
    } 
    else {
      next();
    }
  } 
  else if (to.path === '/dashboard') {
    const cookieValue = document.cookie.match('(^|;)\\s*' + 'loggedin' + '\\s*=\\s*([^;]+)');
    const cookie = cookieValue ? cookieValue.pop() : '';
    const isAuthenticated = cookie === "" ? false : true; 

    if (isAuthenticated) {
      next();
    } 
    else {
      router.push('/login');
    }
  }
  next()
});

export default router