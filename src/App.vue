<template>
  <img alt="Vue logo" src="./assets/kimwipe.jpeg">
  <div id="app">
    <h1>Todo List</h1>
    <div class="add-todo">
      <form @submit.prevent="addTodo" class="add-todo">
        <input 
          v-model="newTodo" 
          @compositionstart="onCompositionStart" 
          @compositionend="onCompositionEnd"
          placeholder="新しいTodoを追加" 
        />
      <button @click="addTodo">+</button>
      </form>
    </div>
    <div class="todo-list">
      <div v-for="(todo, index) in filteredTodos" :key="index" class="todo-item">
        <input type="checkbox" v-model="todo.completed" />
        <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
        <button @click="deleteTodo(index)">❌</button>
      </div>
    </div>
    <div class="filter">
      <label>
        <button @click="switchShowCompleted">
          {{ showCompleted ? 'Hide completed' : 'Show All' }}
        </button>
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
      showCompleted: true,
      isComposing: false, /*文字入力の変換中かどうか*/
    };
  },
  computed: {
    filteredTodos() {
      return this.showCompleted ? this.todos : this.todos.filter(todo => !todo.completed);
    },
  },
  methods: {
    addTodo() {
      if (!this.isComposing && this.newTodo.trim() !== '') {
        this.todos.push({ text: this.newTodo, completed: false });
        this.newTodo = '';
      }
    },
    deleteTodo(index) {
      this.todos.splice(index, 1);
    },
    switchShowCompleted() {
      this.showCompleted = !this.showCompleted;
    },
    onCompositionStart() {
      this.isComposing = true;
    },
    onCompositionEnd() {
      this.isComposing = false;
    },
  },
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