<template>
    <div>
      <h1>About This App</h1>
      <p>学習用に作ったTodo管理アプリです</p>
    </div>
    <div class="feedback-form">
      <h3 id="gray-text">Feedback Form</h3>
      <form @submit.prevent="submitFeedback">
        <input type="text" v-model="name" placeholder="Your Name (Optional)" /><br>
        <input type="email" v-model="email" placeholder="Your Email (Optional)" /><br>
        <textarea v-model="message" placeholder="Your Message" required></textarea><br>
        <button tyoe="submit">Submit</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AboutPage',
    data() {
      return {
        name: '',
        email: '',
        message: ''
      };
    },
    methods: {
      async submitFeedback() {
        if (!this.message) {
          alert("Message is required.");
          return;
        }
        try {
          await this.$http.post('/api/feedback', { name: this.name, email: this.email, message: this.message });
          alert("Feedback submitted successfully.");
          // フォームのリセット
          this.name = '';
          this.email = '';
          this.message = '';
        } catch (error) {
          alert("Failed to submit feedback.");
        }
      }
    }
  };
  </script>

<style>
#app {
  text-align: center;
}

#gray-text {
  color: darkgray;
}

.feedback-form {
  margin-top: 80px;
}

input {
  margin: 5px;
}
textarea {
  margin: 5px;
  width: 200px;
}

</style>