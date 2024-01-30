<template>
    <div id="app">
        <h1>Todo List</h1>
        <form @submit.prevent="addTodo" class="add-todo">
            <input v-model="input_newTodo" placeholder="新しいTodoを追加" /><br>
            <input type="date" v-model="newDueDate" /> <!-- 日付入力 -->
            <button type="submit">追加</button>
        </form>
        <div class="filter">
            <button @click="toggleShowCompleted">
            {{ showCompleted ? 'Hide Completed' : 'Show All' }}
            </button>
        </div>
        <div class="todo-list">
        <todo-item
        v-for="todo in filteredTodos"
        :key="todo.id"
        :todo="todo"
        @delete-todo="deleteTodo"
        @update-todo="updateTodo"
        @toggle-completed="toggleCompleted"
        ></todo-item>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import TodoItem from './TodoItem.vue';
import { v4 as uuidv4 } from 'uuid';

export default {
  components: {
    TodoItem
  },
  data() {
    return {
      input_newTodo: '',
      todos: [],
      showCompleted: true,
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
      const todoText = this.input_newTodo.trim();
      const dueDate = this.newDueDate || null;
      if (todoText !== '') {
        const newTodo = {
          id: uuidv4(), // UUIDを生成
          text: todoText,
          completed: false,
          dueDate: dueDate
        };
        axios.post('http://localhost/todo_api/add.php', newTodo)
          .then(() => {
            // 成功したらリストに追加
            this.todos.push(newTodo); // 生成したUUIDと共に新しいTodoをリストに追加
            this.input_newTodo = ''; // 入力欄をクリア
          })
          .catch(error => console.error("Error adding todo:", error));
      }
    },
    deleteTodo(todoId) {
      axios.delete(`http://localhost/todo_api/delete.php?id=${todoId}`)
        .then(() => {
          // 成功したらリストから削除
          this.todos = this.todos.filter(todo => todo.id !== todoId);
        })
        .catch(error => console.error("Error deleting todo:", error));
    },
    updateTodo(todoId, newText, newDueDate) {
      axios.put('http://localhost/todo_api/edit.php', {
        id: todoId,
        text: newText,
        dueDate: newDueDate
      })
      .then(() => {
        const index = this.todos.findIndex(todo => todo.id === todoId);
        if (index !== -1) {
          this.todos[index].text = newText;
          this.todos[index].dueDate = newDueDate;
        }
      })
      .catch(error => console.error("Error editing todo:", error));
    },
    toggleCompleted(todoId) {
      const index = this.todos.findIndex(todo => todo.id === todoId);
      if (index !== -1) {
        const todo = this.todos[index];
        axios.put(`http://localhost/todo_api/update.php`, {
          id: todoId,
          completed: !todo.completed
        })
        .then(() => {
          // 成功したら状態を切り替え
          this.todos[index].completed = !this.todos[index].completed;
        })
        .catch(error => console.error("Error updating todo:", error));
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
  margin: 10px;
}


</style>