import { createRouter, createWebHashHistory } from 'vue-router';
import TodoList from '../components/TodoList.vue'; // Todoリストページのコンポーネント
import AboutPage from '../views/About.vue'; // Aboutページのコンポーネント

const routes = [
{
path: '/todolist',
name: 'TodoList',
component: TodoList
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