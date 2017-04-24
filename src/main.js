  // The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import vueResource from 'vue-resource'
import About from './components/About'

import WorkerAdd from './components/WorkerAdd'
import Workers from './components/Workers'

import Customers from './components/Customers'
import CustomerDetails from './components/CustomerDetails'
import CustomerEdit from './components/CustomerEdit'
import CustomerAdd from './components/CustomerAdd'

import Orders from './components/Orders'
import OrderDetails from './components/OrderDetails'
import OrderEdit from './components/OrderEdit'
import OrderAdd from './components/OrderAdd'

import Dishes from './components/Dishes'
import DishDetails from './components/DishDetails'
import DishEdit from './components/DishEdit'
import DishAdd from './components/DishAdd'

Vue.use(vueResource)
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {path:'/', component: Customers},
    {path: '/about', component: About},
    
    {path: '/workeradd', component: WorkerAdd},
    {path: '/workers', component: Workers},

    {path:'/customers', component: Customers},
    {path: '/customer/:id', component: CustomerDetails},
    {path: '/customeredit/:id', component: CustomerEdit},
    {path: '/customeradd', component: CustomerAdd},

    {path:'/orders', component: Orders},
    {path: '/order/:id', component: OrderDetails},
    {path: '/orderedit/:id', component: OrderEdit},
    {path: '/orderadd', component: OrderAdd},

    {path:'/dishes', component: Dishes},
    {path: '/dish/:id', component: DishDetails},
    {path: '/dishedit/:id', component: DishEdit},
    {path: '/dishadd', component: DishAdd},

  ]
})

/* eslint-disable no-new */
new Vue({
  router,
  template:
  `
    <div id="app">
      <nav class="navbar navbar-default">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Food72</a>
        </div>
        <div id="navbar" class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li><router-link to="/customers">Клиенты</router-link></li>
            <li><router-link to="/orders">Заказы</router-link></li>
            <li><router-link to="/dishes">Блюда</router-link></li>
            <li><router-link to="/workers">Сотрудники</router-link></li>
            <li><router-link to="/about">Справка</router-link></li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li><router-link to="/customeradd">Добавить клиента</router-link></li>
            <li><router-link to="/orderadd">Добавить заказ</router-link></li>
            <li><router-link to="/dishadd">Добавить блюдо</router-link></li>
            <li><router-link to="/workeradd">Добавить сотрудника</router-link></li>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </nav>
      <router-view></router-view>
    </div>
  `
}).$mount('#app')
