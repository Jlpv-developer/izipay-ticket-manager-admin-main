import Vue from 'vue'
import VueRouter from 'vue-router'
//import BandejaTareas from '../views/BandejaTareas.vue'
import Massive from '../views/Massive.vue'

Vue.use(VueRouter)

const routes = [
  {
    meta: {
      title: 'Massive',
      requiresAuth: true
    },
    path: '/',
    name: 'massive',
    component: Massive
  },
  {
    meta: {
      title: 'Pedidos',
      requiresAuth: true
    },
    path: '/pedidos',
    name: 'pedidos',
    component: () => import(/* webpackChunkName: "forms" */ '../views/Pedidos.vue')
  },
  {
    meta: {
      title: 'Pedidos',
      requiresAuth: true
    },
    path: '/Pedidos/:id',
    name: 'pedidos.pedido',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/TrackingPedido.vue'),
    props: true
  },
  {
    meta: {
      title: 'Forms',
      requiresAuth: true
    },
    path: '/forms',
    name: 'forms',
    component: () => import(/* webpackChunkName: "forms" */ '../views/Forms.vue')
  },
  {
    meta: {
      title: 'Profile',
      requiresAuth: true
    },
    path: '/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue')
  },
  {
    meta: {
      title: 'New Client',
      requiresAuth: true
    },
    path: '/client/new',
    name: 'client.new',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/ClientForm.vue')
  },
  {
    meta: {
      title: 'Edit Client',
      requiresAuth: true
    },
    path: '/client/:id',
    name: 'client.edit',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/ClientForm.vue'),
    props: true
  },
  {
    meta: {
      title: 'Corporativo',
      requiresAuth: true
    },
    path: '/corporative',
    name: 'corporative',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/Corporative.vue')
  },
  {
    meta: {
      title: 'CheckIn',
      requiresAuth: true
    },
    path: '/checkin',
    name: 'checkin',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/CheckIn.vue')
  },
  {
    meta: {
      title: 'Usuarios',
      requiresAuth: true
    },
    path: '/usuarios',
    name: 'usuarios',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/Usuarios.vue')
  },
  {
    meta: {
      title: 'Notificaciones',
      requiresAuth: true
    },
    path: '/notificaciones',
    name: 'notificaciones',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/Notificaciones.vue')
  },
  {
    meta: {
      title: 'Home',
      requiresAuth: true
    },
    path: '/home',
    name: 'home',
    formScreen: false,
    component: () => import(/* webpackChunkName: "client-form" */ '../views/Home.vue')
  },
  {
    meta: {
      title: 'Login',
      formScreen: true
    },
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/Login.vue')
  },
  {
    meta: {
      title: 'Atención',
      formScreen: false
    },
    path: '/incidents',
    name: 'incidents',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/Incidents.vue')
  },
  {
    meta: {
      title: 'Managment',
      formScreen: false
    },
    path: '/managment',
    name: 'managment',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/Managment.vue')
  },
  {
    meta: {
      title: 'Forgot Password',
      formScreen: true
    },
    path: '/forgot-password',
    name: 'forgot',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/ForgotPassword.vue')
  },
  {
    meta: {
      title: '404',
      formScreen: true
    },
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/PageNotFound.vue')
  }
]

const router = new VueRouter({
  // @ts-checkbase: process.env.BASE_URL,
  base: process.env.BASE_URL,
  baselocal: 'http://192.168.1.144:5070',
  baseprod:'https://appizipayweb.azurewebsites.net/api/v1',
  routes,
  scrollBehavior (to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

export default router