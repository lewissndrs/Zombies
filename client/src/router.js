// module imports
import Vue from 'vue';
import Router from 'vue-router';

// route imports
import Game from '@/views/Game';
import Home from '@/views/Home';


Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path:'',
            name: 'home',
            component: Home
        },
        {
            path:'/playgame',
            name: 'game',
            component: Game
        }
    ]
})

export default router;