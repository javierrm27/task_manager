// Import Vue, the main Vue app component, and other dependencies
import Vue from 'vue'
import App from './views/App/App.vue' // The root Vue component
import store from './store' // The Vuex store
import router from './router/router' // Vue Router configuration
import vuetify from './plugins/vuetify.js' // Vuetify for styling
import Spinner from '@/components/Spinner.vue' // Custom spinner component
import ActionButton from '@/components/ActionButton.vue' // Custom action button component
import ConfirmationDialog from '@/components/ConfirmationDialog.vue' // Custom confirmation dialog component

// Register custom components globally for use in the app
Vue.component('spinner', Spinner);  // Register the Spinner component
Vue.component('actionButton', ActionButton); // Register the ActionButton component
Vue.component('confirmationDialog', ConfirmationDialog); // Register the ConfirmationDialog component

// Create a new Vue app instance
new Vue({
  router, // Inject the Vue Router configuration
  store, // Inject the Vuex store
  vuetify, // Inject Vuetify for styling
  render: h => h(App), // Render the root Vue component (App)
}).$mount('#app'); // Mount the app to the element with the ID 'app' in the HTML
