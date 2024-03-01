import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DatailView from '../views/DatailView.vue'
import CategoryAdd from '../views/CategoryAdd.vue'
import SubCategoryAdd from '../views/SubCategoryAdd.vue'
import ProductAdd from '../views/ProductAdd.vue'
import ProductShow from '../views/ProductShow.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/datailview',
    name: 'datailview',
    component: DatailView
  },
  {
    path: '/categoryadd',
    name: 'categoryadd',
    component: CategoryAdd
  },
  {
    path: '/subcategoryadd',
    name: 'subcategoryadd',
    component: SubCategoryAdd
  },
  {
    path: '/productadd',
    name: 'productadd',
    component: ProductAdd
  },
  {
    path: '/productshow',
    name: 'productshow',
    component: ProductShow
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
