// Define the initial state of the store
const state = {
  tasks: [],     // Array to store tasks
  taskFound: {}  // Object to store the task found to edit or delete
  };
  
  // Define getters for accessing state properties
  const getters = {
    // Getter to retrieve all tasks from the state
    getAllTasks: (state) => state.tasks,

    // Getter to find a task by its ID
    getTaskByID: (state) => (id) => state.tasks.find((task) => task.id == id),
    
    // Getter to determine the next available task ID
    getNextAvailableID: (state) => {
      // Create a set of used task IDs
      const usedIDs = new Set(state.tasks.map((task) => task.id));
      for (let i = 1; i <= state.tasks.length + 1; i++) {
        if (!usedIDs.has(i)) {
          return i;
        }
      }
      // If there are no gaps in task IDs, use the next available ID
      return state.tasks.length + 1;
    },

    // Getter to retrieve the found task
    getTaskFound: (state) => state.taskFound || false
  };
  
  // Define actions for managing data and mutations
  const actions = {
    // Action to fetch all tasks from local storage
    fetchAllTasks({ commit }) {
      try {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        commit('SET_ALL_TASKS', tasks);
      } catch (error) {
        console.error('Error parsing tasks from localStorage:', error);
      }
    },

    // Action to save tasks to local storage
    saveTasksLocalStorage({ state }) {
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },

    // Action to create a new task
    createTask({ commit, dispatch }, task) {
      commit('SET_NEW_TASK', task);
      dispatch('saveTasksLocalStorage');
    },

    // Action to edit an existing task
    editTask({ commit, dispatch }, task) {
      // Filter out the task with the same ID and replace it
      const updatedTasks = state.tasks.filter((t) => t.id !== task.id);
      updatedTasks.push(task);
      commit('SET_ALL_TASKS', updatedTasks);
      dispatch('saveTasksLocalStorage');
    },

    // Action to delete a task by its ID
    deleteTaskByID({ commit, dispatch }, id) {
      // Filter out the task with the specified ID
      const updatedTasks = state.tasks.filter((t) => t.id !== id);
      commit('SET_ALL_TASKS', updatedTasks);
      dispatch('saveTasksLocalStorage');
    }
  };
  
  // Define mutations to update the state
  const mutations = {
    // Mutation to set all tasks and sort them by due_date
    SET_ALL_TASKS(state, data) {
      state.tasks = data.length ? data.sort(function(a,b){
        return new Date(b.due_date) - new Date(a.due_date);
      }) : [];
    },

    // Mutation to add a new task to the tasks array
    SET_NEW_TASK(state, data) {
      state.tasks.push(data);
    },

    // Mutation to set the taskFound property
    SET_TASK_FOUND(state, data) {
      state.taskFound = data;
    },
  };
  
  // Export the store configuration
  export default {
    state,
    getters,
    actions,
    mutations,
  };