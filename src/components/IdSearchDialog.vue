<template>
  <!-- A dialog for searching tasks by ID -->
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="text-h5">Search task by ID</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="form_search" v-model="formValid" lazy-validation>
            <!-- Input field for entering the search ID -->
            <v-text-field
              v-model="search"
              :rules="rules"
              label="Search by ID"
              required
            ></v-text-field>
            <p v-if="noTaskFound">No task found with ID provided</p>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <!-- "Cancel" button to close the dialog -->
        <actionButton
          text="Cancel"
          color="red"
          icon="mdi-cancel"
          @button-action="cancelDialog"
          class="float-right"
        />
        <!-- "Search" button to trigger the search action -->
        <actionButton
          text="Search"
          color="green"
          icon="mdi-magnify"
          @button-action="searchID"
          class="float-right"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "IdSearchDialog",
  props: {
    // Define the props for the component
    dialog: {
      type: Boolean,
      default: false
    },
    nextDialog: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    formValid: false,
    search: '',
    noTaskFound: false,
    // Rules for the search input
    rules: [
      (v) => !!v || "ID is required",
      (v) => (v && !isNaN(v)) || "ID must be a number",
    ]
  }),
  methods: {
    // Method to emit the cancel action, and reset the dialog elements
    cancelDialog() {
      this.$emit("cancel-action");
      this.$refs.form_search.reset();
      this.noTaskFound = false;
    },
    // Method to search for a task by ID, and store it in case a task is found
    searchID() {
      this.$refs.form_search.validate();
      if (this.formValid) {
        this.$store.dispatch("setSpinner", true);
        const taskFound = this.$store.getters.getTaskByID(this.search);
        if (taskFound) {
          this.$store.commit('SET_TASK_FOUND', taskFound)
          this.$emit("task-found-action", this.nextDialog);
          this.$refs.form_search.reset();
          this.noTaskFound = false;
        } else {
          this.noTaskFound = true;
        }
        this.$store.dispatch("setSpinner", false);
      }
    },
  }
};
</script>