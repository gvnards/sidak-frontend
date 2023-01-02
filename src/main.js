import Vue from "vue"

import App from "./App.vue"
import router from "./router"
import RuntimeTemplateCompiler from "vue-runtime-template-compiler"
import store from "./store"
import "./register_components"
import "./register_illustration_component.js"
import "./register_modal_components.js"

Vue.use(RuntimeTemplateCompiler)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app")
