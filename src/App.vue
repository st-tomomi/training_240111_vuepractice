<template>
  <div id="app">
    <h1>Todo List</h1>
    <form @submit.prevent="addTodo" class="add-todo">
      <input v-model="newTodo" placeholder="新しいTodoを追加" />
      <button type="submit">追加</button>
    </form>
    <div class="todo-list">
      <todo-item
      v-for="todo in filteredTodos"
      :key="todo.id"
      :todo="todo"
      @delete-todo="deleteTodo"
      @toggle-completed="toggleCompleted"
      ></todo-item>
    </div>
    <div class="filter">
      <button @click="toggleShowCompleted">
      {{ showCompleted ? 'Hide Completed' : 'Show All' }}
      </button>
    </div>

  </div>
  <nav>
    <!-- <router-link to="/" class="nav-link">Todo List</router-link> -->
    <router-link to="/about" class="nav-link">About</router-link>
  </nav>
  <router-view></router-view>
</template>

<script>
import axios from 'axios';
import TodoItem from './components/TodoItem.vue';

export default {
  components: {
    TodoItem
  },
  data() {
    return {
      newTodo: '',
      todos: [],
      showCompleted: true,
      nextTodoId: 1
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
          id: this.nextTodoId++,
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
</script>

<style>
#app {
  text-align: center;
}
img {
  width: 200px;
  height: 200px;
  transform: rotate(270deg);
}
.completed {
  text-decoration: line-through;
}

.add-todo {
  margin: 10px 0;
}

.todo-list {
  text-align: left;
  display: inline-block;
  width: 400px;
}

.todo-item {
  word-break: break-word;
}

.filter {
  margin-top: 10px;
}

.nav-link {
  display: block;
  margin-top: 10px;
}
</style>