import Vue from 'vue'
import App from './App.vue'
import store from "./store/store";
import Keycloak from "keycloak-js";

Vue.config.productionTip = false

let initOptions = {
  url: "http://127.0.0.1:8080/auth",
  realm: "RetroBoard",
  clientId: "vue-test-app",
  onLoad: "login-required",
  promiseType: "native"
}

let keycloak = Keycloak(initOptions);

console.log(keycloak);

keycloak
  .init({
    onLoad: initOptions.onLoad,
  }).then(auth => {
    if (!auth) {
      window.location.reload();
    } else {
      console.log("token", keycloak.token);
      localStorage.setItem("keycloak-token", keycloak.token);
    }
})
  /*.success(auth => {
    if (!auth) {
      window.location.reload();
    } else {
      console.log("Logged in");
    }
  })*/

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
store.commit("setSecurityToken", keycloak.token);
