import ProductDetail from '../components/ProductDetail';
import { HeaderOnly } from '../layouts';
import ShopLayout from '../layouts/ShopLayout';
import UserLayout from '../layouts/UserLayout';
import Home from '../pages/Home';
import Shop from '../pages/Shop';
import Sign from '../pages/Sign';


const publicRoutes = [
    { path: '/', component: Home ,layout:UserLayout},
    { path: '/sign', component: Sign, layout: HeaderOnly },
    // {path: '/shop/register', component: Shop,layout:HeaderOnly},
    {path: 'shop' ,component:Shop,layout:ShopLayout},
    {path: '/product',component:ProductDetail,layout:UserLayout}
];


export { publicRoutes };
