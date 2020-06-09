import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AboutMovie from "../views/AboutMovie";
import AboutSerie from "../views/AboutSerie";
import Profile from "../views/Profile";
import ProfileMovie from "../views/ProfileMovie";
import Signup from "../views/Signup";
import Signin from "../views/Signin";
import Admin from "../views/Admin";
import Movie from "../views/Movie";
import Serie from "../views/Serie";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/movie',
    name: 'movie',
    component: Movie
  },
  {
    path: '/serie',
    name: 'serie',
    component: Serie
  },
  {
    path: '/movie/about/:id',
    name: 'aboutMovie',
    component: AboutMovie
  },
  {
    path: '/serie/about/:id',
    name: 'aboutSerie',
    component: AboutSerie
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/signin',
    name: 'signin',
    component: Signin
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },
  {
    path: '/profile/movie',
    name: 'profileMovie',
    component: ProfileMovie
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
