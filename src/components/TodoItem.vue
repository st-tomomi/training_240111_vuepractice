<template>
    <div class="todo-item">
      <div v-if="isEditing">
        <input v-model="editableText" />
        <input type="date" v-model="editableDueDate" />
        <button @click="updateTodo">更新</button>
        <button @click="cancelEdit">キャンセル</button>
      </div>
      <div v-else>
        <input type="checkbox" :checked="todo.completed" @change="toggleCompleted" />
      <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
      <span v-if="todo.dueDate">{{ todo.dueDate }}</span>
      <button @click="startEdit">編集</button>
      <button @click="deleteTodo">削除</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      todo: Object
    },
    data() {
      return {
        isEditing: false,
        editableText: this.todo.text,
        editableDueDate: this.todo.dueDate
      };
    },
    methods: {
      deleteTodo() {
        this.$emit('delete-todo', this.todo.id);
      },
      startEdit() {
        this.isEditing = true;
      },
      updateTodo() {
        this.$emit('update-todo', this.todo.id, this.editableText, this.editableDueDate);
        this.isEditing = false;
      },
      cancelEdit() {
        this.isEditing = false;
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
  