import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home/Home.vue';
import Videos from '../views/videos/Videos.vue';
import Video from '../views/video/Video.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/videos',
    name: 'Videos',
    component: Videos,
  },
  {
    path: '/videos/:id',
    name: 'Video',
    component: Video,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
