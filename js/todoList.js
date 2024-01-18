import axios from 'axios';
import TodoItem from './TodoItem.vue';
import { v4 as uuidv4 } from 'uuid';

export default {
    components: {
      TodoItem
    },
    data() {
      return {
        newTodo: '',
        todos: [],
        showCompleted: true,
        // nextTodoId: 1
      };
    },
    // APIリクエストの実装
    mounted() {
      this.fetchTodos();
    },
    computed: {
      filteredTodos() {
        return this.showCompleted ? this.todos : this.todos.filter(todo => !todo.completed);
      },
    },
    methods: {
      fetchTodos() {
        axios.get('http://localhost/todo_api/index.php')
        .then(response => {
          // APIからのレスポンスデータを受け取る
          this.todos = response.data;
          // todo配列の各要素で、'done'プロパティをブール値に変換する
          const updatedTodos = this.todos.map(todo => ({
            ...todo,
            completed: Boolean(Number(todo.completed))
          }))
          this.todos = updatedTodos;
          console.log(this.todos);
        })
        .catch(error => {
          //エラー処理
          console.error("Error fetching todos:", error);
        });
      },
      addTodo() {
        if (this.newTodo.trim() !== '') {
          this.todos.push({
            id: uuidv4(),
            text: this.newTodo,
            completed: false
          });
          this.newTodo = '';
        }
      },
      deleteTodo(todoId) {
        this.todos = this.todos.filter(todo => todo.id !== todoId);
      },
      toggleCompleted(todoId) {
        const index = this.todos.findIndex(todo => todo.id === todoId);
        if (index !== -1) {
          this.todos[index].completed = !this.todos[index].completed;
        }
      },
      toggleShowCompleted() {
        this.showCompleted = !this.showCompleted;
      }
    }
  };