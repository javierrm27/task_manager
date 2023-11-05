<template>
  <!-- Vue Dialog component to display a form -->
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <!-- Dialog title -->
        <span class="text-h5">{{ dialogTitle }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <!-- Form container -->
          <v-form ref="form" v-model="formValid">
            <!-- Title input -->
            <v-text-field
              v-model="formData.title"
              :counter="50"
              :rules="titleRules"
              :disabled="fieldsDisabled"
              label="Title"
              required
            ></v-text-field>

            <!-- Description input -->
            <v-textarea
              v-model="formData.description"
              :counter="150"
              :rules="descriptionRules"
              :disabled="fieldsDisabled"
              label="Description"
              required
            ></v-textarea>

            <!-- Due Date input with date picker -->
            <v-menu v-model="datePicker" :close-on-content-click="false" max-width="290">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  :value="formData.dueDate"
                  clearable
                  label="Due Date"
                  placeholder="Select a date"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  :disabled="fieldsDisabled"
                  :rules="dueDateRules"
                  @click:clear="formData.dueDate = null"
                ></v-text-field>
              </template>
              <v-date-picker v-model="formData.dueDate" :disabled="fieldsDisabled" @change="datePicker = false"></v-date-picker>
            </v-menu>

            <!-- Checkbox to mark task as completed (only available during edit) -->
            <v-checkbox 
              v-if="action === 'edit'" 
              v-model="formData.completed" 
              label="Mark as completed" 
              :disabled="fieldsDisabled"
            ></v-checkbox>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <!-- Cancel button -->
        <actionButton
            text="Cancel"
            color="red"
            icon="mdi-cancel"
            @button-action="cancelDialog"
            class="float-right"
          />
        <!-- Save button -->
        <actionButton
            text="Save"
            color="green"
            icon="mdi-content-save"
            :disabled="!formValid || fieldsDisabled"
            @button-action="saveForm"
            class="float-right"
          />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from 'moment';

export default {
  name: "TaskFormDialog",
  props: {
    // Define the props for the component
    dialog: {
      type: Boolean,
      default: false
    },
    dialogTitle: {
      type: String,
      default: "Dialog"
    },
    action: {
      type: String,
      default: "create"
    },
    task: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      // Define the models for the form inputs
      formData: {
        title: "",
        description: "",
        dueDate: null,
        completed: false,
      },
      fieldsDisabled: false,
      datePicker: false,
      formValid: true,
      // Rules for the title input
      titleRules: [
        (v) => !!v || "Title is required",
        (v) => (v && v.length <= 50) || "Title must be less than 100 characters",
      ],
      // Rules for the description input
      descriptionRules: [
        (v) => !!v || "Description is required",
        (v) => (v && v.length <= 150) || "Description must be less than 300 characters",
      ],
      // Rules for the date input
      dueDateRules: [
        (v) => !!v || "Due date is required",
        (v) =>
          (v && moment(v).isAfter(moment())) ||
          "Due date must be later than the current date",
      ],
    };
  },
  watch: {
    dialog(newVal) {
      if (this.action === "edit" && this.task && newVal) {
        // Load data for editing
        this.formData.title = this.task.title;
        this.formData.description = this.task.description;
        this.formData.dueDate = this.task.due_date;
        this.formData.completed = this.task.status === 'Completed';
        this.task.status === 'Completed' ? this.fieldsDisabled = true : this.fieldsDisabled = false;
      } else if(newVal){
        this.fieldsDisabled = false
      }
    },
  },
  methods: {
    // Emit the cancel action and reset the form
    cancelDialog() {
      this.$emit("cancel-action");
      this.resetForm();
    },
    // Save the form data if form is validated
    saveForm() {
      this.$refs.form.validate();
      if (this.formValid) {
        this.$store.dispatch('setSpinner', true);
        const taskID = this.action === 'create' ? this.$store.getters.getNextAvailableID : this.task.id;
        const objToSend = {
          id: taskID,
          title: this.formData.title,
          description: this.formData.description,
          due_date: this.formData.dueDate,
          status: this.formData.completed ? 'Completed' : 'Pending',
        };
        this.$emit("save-action", { action: this.action, task: objToSend });
        this.resetForm();
        this.$store.dispatch('setSpinner', false);
      }
    },
    // Reset the form fields
    resetForm() {
      this.$refs.form.reset();
      this.formData.dueDate = null;
    }
  }
};
</script>