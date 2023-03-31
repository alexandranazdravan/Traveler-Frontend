import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
          path: '/',
          name: 'home',
          component: () => import('../components/sidemenu.vue'),
        },
        {
          path: '/admin',
          name: 'admin',
          component:  () => import('../components/admin.vue')
        },
        {
          path: '/login',
          name: 'login',
          component:() => import('../components/login.vue')
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
      ]
})


router.beforeEach((to, from, next) => {
  // Check if the user is trying to access the /admin route
  if (to.path === '/admin') {
    // Check if the user is authenticated
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
          next(); // User is authenticated, allow access to the /admin route
        }
      })
      .catch(error => {
        this.errorMessage = 'Something went wrong';
      });
    } 
    else {
      // User is not authenticated, redirect to login page
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
      next(); // User is not authenticated, allow access to the /login route
    }
  } 
  else if (to.path === '/dashboard') {
    const cookieValue = document.cookie.match('(^|;)\\s*' + 'loggedin' + '\\s*=\\s*([^;]+)');
    const cookie = cookieValue ? cookieValue.pop() : '';
    const isAuthenticated = cookie === "" ? false : true; 

    if (isAuthenticated) {
      next(); // User is authenticated, allow access to the /dashboard route
    } 
    else {
      router.push('/login');
    }
  }
});

export default router