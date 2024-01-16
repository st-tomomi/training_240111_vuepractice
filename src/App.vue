<template>
  <div id="app">
    <h1>Todo List</h1>
    <!-- <div class="add-todo">
      <input v-model="newTodo" placeholder="新しいTodoを追加" />
      <button @click="addTodo">追加</button>
    </div> -->
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
</template>

<script>
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
  computed: {
    filteredTodos() {
      return this.showCompleted ? this.todos : this.todos.filter(todo => !todo.completed);
    },
  },
  methods: {
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
</style>