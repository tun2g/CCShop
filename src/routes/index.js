import ShopProductList from '../components/ShopProductList';
import ProductDetail from '../components/Products/ProductDetail';
import { HeaderOnly } from '../layouts';
import ShopLayout from '../layouts/ShopLayout';
import UserLayout from '../layouts/UserLayout';
import Home from '../pages/Home';
import Shop from '../pages/Shop';
import Sign from '../pages/Sign';
import Cart from '../pages/Cart';
import Profile from '../pages/Profile';
import ProfileOther from '../pages/ProfileOther';
import Report from '../pages/Report';


const publicRoutes = [
    { path: '/', component: Home ,layout:UserLayout},
    { path: '/search', component: Home ,layout:UserLayout},
    { path: '/sign', component: Sign, layout: HeaderOnly },
    {path:'/cart',component:Cart,layout:UserLayout},
    // {path: '/shop/register', component: Shop,layout:HeaderOnly},
    {path:'/report',component:Report,layout:ShopLayout},
    {path: '/shop' ,component:Shop,layout:ShopLayout},
    {path: '/product',component:ProductDetail,layout:UserLayout},
    {path: '/shop/list-product',component:ShopProductList,layout:ShopLayout},
    {path: '/profile', component:Profile,layout:UserLayout},
    {path: '/profile-other',component:ProfileOther, layout:UserLayout},
];


export { publicRoutes };
