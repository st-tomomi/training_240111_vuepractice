<template>
    <div class="todo-item">
      <input type="checkbox" :checked="todo.completed" @change="toggleCompleted" />
      <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
      <button @click="deleteTodo">削除</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      todo: Object
    },
    methods: {
      deleteTodo() {
        this.$emit('delete-todo', this.todo.id);
      },
      toggleCompleted() {
        this.$emit('toggle-completed', this.todo.id);
      }
    }
  }
  </script>
  
  <!-- スタイル -->
  <style>
  .completed {
    text-decoration: line-through;
  }
  </style>
  