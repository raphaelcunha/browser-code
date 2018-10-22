import Vue from 'vue';
import axios from 'axios';
import VueRouter from 'vue-router';
import App from './App';
import store from './store/store';
import Home from 'components/Home';
import Dashboard from 'components/Dashboard';
import Repositories from 'components/Repositories';
import RepositoriesItem from 'components/RepositoriesItem';
import Users from 'components/Users';
import User from 'components/User';
import Videos from 'components/Videos';
import LocalStorage from './localstorage';
import VueFire from 'vuefire';

Vue.use(VueRouter);
Vue.use(VueFire);

axios.defaults.baseURL = 'https://api.github.com';
axios.defaults.headers.common['Authorization'] = `token ${LocalStorage.getToken()}`;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$http = axios;


const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/dashboard',
    component: Dashboard,
    name: 'Dashboard',
  },
  {
    path: '/projects',
    component: Repositories,
    name: 'Repositories',
  },
  {
    path: '/projects/:owner',
    component: RepositoriesItem,
    name: 'Repositorie',
  },
  {
    path: '/developers',
    component: Users,
    name: 'Developers',
  },
  {
    path: '/developers/:user',
    component: User,
    name: 'Developer',
  },
  {
    path: '/videos',
    component: Videos,
    name: 'Videos',
  }

];

const router = new VueRouter({
  saveScrollPosition: true,
  mode: 'history',
  routes, // short for routes: routes
});

// verifica se esta logado
router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next()
  } else {
    if (LocalStorage.getToken()) {
      next()
    } else {
      next({
        path: '/'
      })
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
