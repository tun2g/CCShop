import ShopProductList from '../components/ShopProductList';
import ProductDetail from '../components/Products/ProductDetail';
import { HeaderOnly } from '../layouts';
import ShopLayout from '../layouts/ShopLayout';
import UserLayout from '../layouts/UserLayout';
import Home from '../pages/Home';
import Shop from '../pages/Shop';
import Sign from '../pages/Sign';
import Cart from '../components/Cart';


const publicRoutes = [
    { path: '/', component: Home ,layout:UserLayout},
    { path: '/sign', component: Sign, layout: HeaderOnly },
    {path:'/cart',component:Cart,layout:UserLayout},
    // {path: '/shop/register', component: Shop,layout:HeaderOnly},
    {path: '/shop' ,component:Shop,layout:ShopLayout},
    {path: '/product',component:ProductDetail,layout:UserLayout},
    {path: '/shop/list-product',component:ShopProductList,layout:ShopLayout},
];


export { publicRoutes };
