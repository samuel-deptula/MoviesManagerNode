import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AboutMovie from "../views/AboutMovie";
import AboutSerie from "../views/AboutSerie";
import Profile from "../views/Profile";
import ProfileMovie from "../views/ProfileMovie";
import ProfileWatched from "../views/ProfileWatched";
import Signup from "../views/Signup";
import Signin from "../views/Signin";
import Admin from "../views/Admin";
import Movie from "../views/Movie";
import ListMovie from "../views/ListMovie";
import Contact from "../views/Contact";
import AboutPost from "../views/AboutPost";

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
    path: '/movie/list',
    name: 'listMovie',
    component: ListMovie
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
    path: '/profil/movie',
    name: 'profileMovie',
    component: ProfileMovie
  },
  {
    path: '/profil/watched',
    name: 'profileWatched',
    component: ProfileWatched
  },
  {
    path: '/contact',
    name: 'contact',
    component: Contact
  }
  ,
  {
    path: '/post/:id',
    name: 'aboutPost',
    component: AboutPost
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
