import { createRouter,createWebHistory } from "vue-router";
import DefaultLayout from '../components/DefaultLayout.vue'
import Home from '../views/Home.vue'
import  Categories from '../views/Categories.vue'
import  ProductDetail from '../views/ProductDetail.vue'
import Cart from '../views/Cart.vue'

const routes = [
      {
        path:"/",
        component:DefaultLayout,
        children:[
            {
                path:"/",
                name:"home",
                component:Home
            },
            {
                path:'/categories',
                name:"category",
                component:Categories
            },
            {
                path:'/products/:id',
                name:"product-detail",
                component:ProductDetail
            },
            {
                path:'/cart',
                name:"cart",
                component:Cart
            },
        ]
      }
]


const router = createRouter({
    history:createWebHistory(),
    routes
})

export default router