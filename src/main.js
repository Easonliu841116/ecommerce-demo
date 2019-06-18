// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import 'jquery';
import 'bootstrap';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import App from './App';
import router from './router';
import CurrencyFilter from './assets/helpers/CurrencyFilter';
import DateFilter from './assets/helpers/DateFilter';
import './bus';

Vue.use(VueAxios, axios);
Vue.config.productionTip = false;
axios.defaults.withCredentials = true;
Vue.component('Loading', Loading);
Vue.filter('CurrencyFilter', CurrencyFilter);
Vue.filter('DateFilter', DateFilter);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});

router.beforeEach((to, from, next) => {
  const url = `${process.env.APIPATH}/api/user/check`;
  if (to.meta.requiresAuth) {
    axios.post(url).then((response) => {
      // eslint-disable-next-line
      response.data.success ? next() : next({ path: '/login' });
    });
  } else {
    next();
  }
});
