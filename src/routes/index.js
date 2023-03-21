import { HeaderOnly } from '../layouts';
import Home from '../pages/Home';
import Shop from '../pages/Shop/indes';
import Sign from '../pages/Sign';


const publicRoutes = [
    { path: '/', component: Home },
    { path: '/sign', component: Sign, layout: HeaderOnly },
    {path: '/shop', component: Shop,layout:HeaderOnly},
];


export { publicRoutes };
