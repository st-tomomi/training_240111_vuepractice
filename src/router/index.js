import { createRouter, createWebHashHistory } from 'vue-router';
import App from '../App.vue'; // Todoリストページのコンポーネント
import AboutPage from '../views/About.vue'; // Aboutページのコンポーネント

const routes = [
{
path: '/',
name: 'TodoList',
component: App
},
{
path: '/about',
name: 'AboutPage',
component: AboutPage
}
];

const router = createRouter({
history: createWebHashHistory(),
routes
});
    
export default router;