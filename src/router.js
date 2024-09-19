import { createWebHashHistory, createRouter } from 'vue-router'

const routes = [
  { path: '/', name: 'game', component: () => import('@/Game.vue') },
  { path: '/scores', name: 'scores', component: () => import('@/Scores.vue') }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export { router }
