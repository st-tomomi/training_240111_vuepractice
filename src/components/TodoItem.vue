<template>
    <!-- <div class="todo-item">
      <div v-if="isEditing">
        <input v-model="editableText" />
        <input type="date" v-model="editableDueDate" />
        <div class="buttons-right">
          <button @click="updateTodo">更新</button>
          <button @click="cancelEdit">キャンセル</button>
        </div>
      </div>
      <div v-else>
        <input type="checkbox" :checked="todo.completed" @change="toggleCompleted" />
      <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
      <span v-if="todo.dueDate">{{ todo.dueDate }}</span>
      <div class="buttons-right">
        <button @click="startEdit">編集</button>
        <button @click="deleteTodo">削除</button>
      </div>
      </div>
    </div> -->
  <div class="todo-item">
    <div class="todo-item-content">
      <div v-if="isEditing">
        <input size="40" v-model="editableText" />
        <input type="date" v-model="editableDueDate" />
      </div>
      <div v-else>
        <input type="checkbox" :checked="todo.completed" @change="toggleCompleted" />
        <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
        <span v-if="todo.dueDate">{{ todo.dueDate }}</span>
      </div>
    </div>
    <div class="buttons-right">
      <button v-if="isEditing" @click="updateTodo">更新</button>
      <button v-else @click="startEdit">編集</button>
      <button v-if="isEditing" @click="cancelEdit">キャンセル</button>
      <button v-else @click="deleteTodo">削除</button>
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

  .todo-item {
  display: flex;
  align-items: center; 
  justify-content: space-between;
  width: 600px; 
  margin-bottom: 10px; 
}

.todo-item-content {
  /* display: flex;
  flex-grow: 1;
  align-items: center; */
  flex-grow: 1;
  overflow-x: auto;
}

.todo-item-content span {
  /* white-space: nowrap; */
  overflow: hidden;
  text-overflow: ellipsis;
}

.todo-item input[type="checkbox"], .todo-item span {
  margin-right: 10px; 
}

.buttons-right {
  /* margin-left: auto; */
  flex-shrink: 0;
  min-width: 100px;
}
  </style>
  