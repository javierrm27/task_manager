// Import necessary modules from Vue and Vuex
import Vue from 'vue'
import Vuex from 'vuex'

// Import custom modules for your store
import data from './modules/data'
import spinner from './modules/spinner'

// Enable Vue to use Vuex
Vue.use(Vuex)

// Determine if the store should be in strict mode based on the environment
const debug = process.env.NODE_ENV !== 'production'

// Create a new Vuex store instance
const store = new Vuex.Store({
    // Define modules for the store
    modules: {
        data,      // Import data module
        spinner    // Import spinner module
    },
    strict: debug   // Enable strict mode in development for better debugging
})

// Export the Vuex store for use in the Vue application
export default store

