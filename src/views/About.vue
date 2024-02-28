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
        <textarea v-model="message" placeholder="Your Message" ></textarea><br>
        <button tyoe="submit">Submit</button>
      </form>
    </div>
    <div>
      <ul>
        <li v-for="feedback in feedbacks" :key="feedback._id">
          {{  feedback.message }}
          <span class="feedback-date">{{ convertToJST(feedback.createdAt) }}</span>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';

  export default {
    name: 'AboutPage',
    data() {
      return {
        name: '',
        email: '',
        message: '',
        // フィードバックのメッセージを表示するため
        feedbacks: []
      };
    },
    created() {
      this.fetchFeedbacks();
    },
    methods: {
      async fetchFeedbacks() {
          try {
            const response = await axios.get('http://35.222.238.228:3000/api/feedback');
            this.feedbacks = response.data;
          } catch(error) {
            console.error("Failed to fetch feedbacks:", error);
          }
        
      },
      async submitFeedback() {
        if (!this.message) {
          alert("メッセージを入力してください");
          return;
        }
        try {
          const response = await axios.post('http://35.222.238.228:3000/api/feedback', { 
            name: this.name, 
            email: this.email, 
            message: this.message 
          });
          
          if (response.status === 200) {
            this.fetchFeedbacks();
            this.name = '';
            this.email = '';
            this.message = '';
            alert("ありがとうございます😁");
          } else {
            throw new Error("Invalid response status: " + response.status);
          }
        } catch (error) {
          console.error("Failed to submit feedback:", error);
          alert("フィードバックの送信に失敗しました");
        }
      },
      convertToJST(utcDateString) {
        const date = new Date(utcDateString);
        return new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          timeZone: 'Asia/Tokyo'
        }).format(date);
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

.feedback-date {
  color:darkgrey;
  font-size:70%;
}

input {
  margin: 5px;
}
textarea {
  margin: 5px;
  width: 200px;
}

ul {
  list-style: none;
}

</style>