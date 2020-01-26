import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'

import Question from '../components/Questions.vue'
import QuestionDetail  from '../components/QuestionDetail.vue'

//const load = (component) => () => import(/* webpackChunkName: "[request]" */ `@/views/${component}.vue`)

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HelloWorld
  },
  {
    path: '/question',
    name: 'question',
    component: Question
  },
  {
    path: '/question/detail',
    name: 'question-detail',
    component: QuestionDetail
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router