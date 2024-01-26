<template>
  <nav>
    <router-link to="/about" class="nav-link">About</router-link>
    <router-link to="/todolist" class="nav-link">Todo List</router-link>
  </nav>
  <router-view></router-view>
</template>

<script>

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
  display: inline-block;
  margin-right: 10px;
}
</style>