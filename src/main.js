import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
// import Student from '../src/components/students.vue'
// import HelloWorld from '../src/components/HelloWorld.vue'
// import { component } from 'vue/types/umd'
import routes from './routes';
import {BootstrapVue,BootstrapVueIcons} from 'bootstrap-vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import { ValidationProvider } from 'vee-validate';
 
// Register it globally
// main.js or any entry file.
Vue.component('ValidationProvider', ValidationProvider);

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.use(VueRouter);

const router = new VueRouter({routes});

Vue.config.productionTip = false

new Vue({
	router,
  render: h => h(App),
}).$mount('#app')

