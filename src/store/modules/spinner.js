// Define the initial state for the spinner store module
const _state = {
    active: false  // A boolean property to track the spinner's status
};

// Define getters for accessing the spinner state
const _getters = {
    // Getter to retrieve the spinner's current status
    getSpinnerStatus(state){
        return state.active;
    }
};

// Define actions for performing actions related to the spinner
const _actions = {
    // Action to set the spinner's status
    setSpinner({commit}, status){
        commit('SET_SPINNER', status);
    }
};

// Define mutations for updating the spinner state
const _mutations = {
    // Mutation to set the spinner's status
    SET_SPINNER(state, status) {
        state.active = status;
    }
};

// Export the spinner store module configuration
export default ({
    state: _state,     // State of the spinner
    getters: _getters, // Getters to access spinner state
    actions: _actions, // Actions to control the spinner
    mutations: _mutations  // Mutations to update spinner state
});