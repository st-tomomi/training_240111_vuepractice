<template>
  <div id="container">
    <div id="title">
      <img alt="Vue logo" src="./assets/logo.png">
      <h1>Counter App</h1>
    </div>
    <div id="buttons">
      <button @click="count++">Count: {{ count }}</button>
      <button @click="count = 0">Reset</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      count: 0
    }
  }  
}
</script>

<style>
#container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
}

button {
  width: 150px; /* ボタンの幅を固定 */
  margin: 10px; /* ボタンの間の隙間 */
  padding: 10px 20px; /* ボタンの内側の余白 */
}

#title img {
  margin-bottom: 20px; /* ロゴとタイトルの間の余白 */
}

#title, #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
