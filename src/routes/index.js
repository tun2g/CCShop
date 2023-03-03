import { HeaderOnly } from '../layouts';
import Home from '../pages/Home';
import Sign from '../pages/Sign';


const publicRoutes = [
    { path: '/', component: Home },
    { path: '/sign', component: Sign, layout: HeaderOnly },
];


export { publicRoutes };
