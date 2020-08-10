<template>
  <div>
    <div>
      <h1>Welcome to your MVP</h1>
      <button id="connect" type="submit" :disabled="connected === true" @click.prevent="connect">Connect</button>
      <button id="disconnect" type="submit" :disabled="connected === false" @click.prevent="disconnect">Disconnect</button>
      <button id =employee1 name="users" type="submit" @click.prevent="sendUserMessage">Users</button>
      <button id =employee2 name="admin" type="submit" @click.prevent="sendAdminMessage">Admin</button>
      <button id =employee3 name="allUsers" type="submit" @click.prevent="sendAllUserMessage">AllUsers</button>
    </div>
    <div>
      <label for="name">Your name?</label>
      <input type="text" id="name" v-model="from" placeholder="Your name here...">
    </div>
    <div>
      <button id="send" type="submit" @click.prevent="sendMessage">Send Message</button>
    </div>
  </div>
</template>

<script>
import Stomp from "webstomp-client";

export default {
  name: "WebSocket",

  data() {
    return {
      receivedMessages: [],
      stompClient: null,
      connected: false,
      from: "",
      text: "test Message",
      auth: "1234",
      message: "",
      Authorization: ""
    };
  },
  methods: {
    setEmployeeMessage() {
      return {
        text: "Hi"
      }
    },

    setMessage() {
      return {
        "from": this.from,
        "text": this.text,
        "auth": this.auth,
      }
    },

    setHeaders() {
      return {
        from: this.from,
        text: this.text,
        auth: this.auth,
        Authorization: this.Authorization
      }
    },

    sendMessage() {
      console.log(this.connection);
      this.stompClient.send("/app/messages", JSON.stringify(this.setMessage()), {});
    },

    sendUserMessage() {
      console.log(this.connection);
      this.stompClient.send("/app/user", JSON.stringify(this.setEmployeeMessage()), this.setHeaders());
    },

    sendAdminMessage() {
      console.log(this.connection);
      this.stompClient.send("/app/messages", JSON.stringify(this.setEmployeeMessage()), this.setHeaders());
    },

    sendAllUserMessage() {
      console.log(this.connection);
      this.stompClient.send("/app/messages", JSON.stringify(this.setEmployeeMessage()), this.setHeaders());
    },

    connect() {
      console.log("Connecting to Websocket...");
      const headers = this.setHeaders();
      const url = "ws://localhost:8082/websocket";
      this.stompClient = Stomp.client(url);
      console.log("The Authorization Token from localStorage " + localStorage.getItem("keycloak-token"));
      console.log("The authorization Token from Store " + this.$store.getters.authorizationToken);
      this.stompClient.connect(headers/*{headers}*/, frame => {
            this.connected = true;
            console.log("Connected: " + frame);
            this.stompClient.subscribe("/topic/messages", tick => {
              console.log(tick);
              this.receivedMessages.push(JSON.parse(tick.body).content);
            });
          },
          error => {
            console.log(error);
            this.connected = false;
          }
      );
    },

    disconnect() {
      if (this.stompClient != null) {
        this.stompClient.disconnect();
      }
      this.connected = false;
      console.log("Disconnected");
    }
  },
};
</script>

<style scoped>

</style>