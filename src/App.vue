<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <div id="app">
    <h1>Todo List</h1>
    <div class="add-todo">
      <!-- @keyup.enter イベントトリガー　Enterキー　関数addTodoを呼び出す -->
      <input v-model="newTodo" @keyup.enter="addTodo" placeholder="新しいTodoを追加" />
      <button @click="addTodo">追加</button>
    </div>
    <div class="todo-list">
      <div v-for="(todo, index) in filteredTodos" :key="index">
        <input type="checkbox" v-model="todo.completed" />
        <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
        <button @click="deletedTodo(index)">削除</button>
      </div>
    </div>
    <div class="filter">
      <label>
        <input type="checkbox" v-model="showCompleted" /> 実行済みのTodoを表示
      </label>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTodo: '',
      todos: [],
      showCompleted: false,
    };
  },
  computed: {
    filteredTodos() {
      if (this.showCompleted) {
        return this.todos;
      } else {
        return this.todos.filter((todo) => !todo.completed);
      }
    },
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim() !== '') {
        this.todos.push({ text: this.newTodo, completed: false });
        this.newTodo = '';
      }
    },
    deleteTodo(index) {
      this.todos.splice(index, 1);
    },
  },
};
</script>

<style>
.completed {
  text-decoration: line-through;
}

.add-todo {
  margin-bottom: 10px;
}

.todo-list {
  margin-bottom: 10px;
}

.filter {
  margin-top: 10px;
}
</style>
