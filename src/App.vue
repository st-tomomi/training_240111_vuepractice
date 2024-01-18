<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <div id="app">
    <nav>
      <a href="about.html">About</a>
      <a href="todolist.html">TodoList</a>
    </nav>
    <!-- コンポーネントをレンダリングする場所 -->
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.nav {
  display: inline-block;
  margin-left: 10px;
}
</style>
