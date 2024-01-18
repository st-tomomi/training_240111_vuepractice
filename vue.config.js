const { defineConfig } = require('@vue/cli-service')
module.exports = {
  pages: {
    index: {
      // エントリーポイントとなるjsファイル
      entry: 'src/main.js',
      // テンプレートとなるHTMLファイル
      template: 'public/index.html',
      // 出力されるファイル名
      filename: 'index.html'
    },
    about: {
      entry: 'src/main.js',
      template: 'public/about.html',
      filename: 'about.html'
    },
    todolist: {
      entry: 'src/main.js',
      template: 'public/todolist.html',
      filename: 'todolist.html'
    }
  }
}
