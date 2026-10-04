import { createRouter, createWebHistory } from 'vue-router'

import Login from '../views/auth/Login.vue'
import NotFound from '../views/NotFound.vue'
import Profile from '../views/profile/Profile.vue'
import AllSites from '../views/sites/AllSites.vue'
import CreateSite from '../views/sites/CreateSite.vue'
import SingleSite from '../views/sites/SingleSite.vue'
import AllTemplates from '../views/templates/AllTemplates.vue'
import CreateTemplate from '../views/templates/CreateTemplate.vue'
import SingleTemplate from '../views/templates/SingleTemplate.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', name: 'login', component: Login },
    { path: '/profile', name: 'profile', component: Profile },
    { path: '/sites', name: 'all-sites', component: AllSites },
    { path: '/sites/:name', name: 'single-create', component: SingleSite },
    { path: '/sites/new', name: 'create-site', component: CreateSite },
    { path: '/templates', name: 'templates', component: AllTemplates },
    { path: '/templates/:name', name: 'single-template', component: SingleTemplate },
    { path: '/templates/new', name: 'create-template', component: CreateTemplate },

    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  ],
})

export default router
