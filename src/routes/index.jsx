import About from '../pages/frontend/About'
import Layout from '../pages/frontend/Layout'
import Home from '../pages/frontend/Home'
import Products from '../pages/frontend/Products'
import Product from '../pages/frontend/products/Product'
import NotFound from '../pages/NotFound'
import AdminLayout from '../pages/backend/AdminLayout'
import Carts from '../pages/frontend/Carts'
import Loading from '../utils/loading'
const routes = [
    {
        path:'/',
        element: <Layout />,
        children: [
            {
                index: true, //path在第二層以後不加入 / ,''繼承上層
                element: < Home/>
            },
            {
                path: 'about',
                element: < About/>
            },
            {
                path: 'carts',
                element: <Carts/>
            },
            {
                path: 'products',
                element: < Products/>,
                children: [
                    {
                        path: ':id',
                        element: <Product />
                    }
                ]
            },
            {
                path: 'product/:id',
                element: <Product />
            },
        ]
    },
    {
        path:'/adminLayout',
        element: <AdminLayout />
    },
    {
        path: '*',
        element: <NotFound />
    }
]

export default routes;