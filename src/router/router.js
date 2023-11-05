// Import Vue and Vue Router
import Vue from "vue";
import Router from "vue-router";

// Import the Home view component
const home = () => import('@/views/Home');

// Use Vue Router as a Vue plugin
Vue.use(Router);

// Create a new Vue Router instance and export it
export default new Router({
  mode: "history", // Use HTML5 history mode for cleaner URLs
  routes: [
    {
      path: "/", // Define the route path for the Home view
      name: "Home", // Assign a name to the route
      component: home // Associate the Home view component with this route
    }
  ]
});
