<template>
  <!-- A confirmation dialog component -->
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <!-- Dialog title based on the 'title' prop -->
        <span class="text-h5">{{ title }}</span>
      </v-card-title>
      <v-card-text>
        <!-- Display confirmation text based on the 'text' prop -->
        {{ text }}
      </v-card-text>
      <v-card-actions>
        <!-- "Cancel" button to close the dialog -->
        <actionButton
          text="Cancel"
          color="red"
          icon="mdi-cancel"
          @button-action="$emit('cancel-action')"
          class="float-right"
        />
        <!-- "Accept" button to trigger the save action and pass the 'action' prop as a parameter -->
        <actionButton
          text="Accept"
          color="green"
          icon="mdi-check"
          @button-action="$emit('save-action', {action: action})"
          class="float-right"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ConfirmationDialog",
  props: {
    // Define the props for the component
    dialog: {
      type: Boolean,
      default: false,
    },
    action: {
      type: String,
      default: "delete",
    },
    title: {
      type: String,
      default: "Confirmation",
    },
    text: {
      type: String,
      default: "Are you sure?",
    },
  }
};
</script>
