<template>
  <!-- A reusable action button component -->
  <v-btn :color="color" :disabled="disabled" class="ma-2 white--text" @click="$emit('button-action')">
    <!-- Display the button text based on the 'text' prop -->
    {{ text }}
    <!-- Display an icon, if provided in the 'icon' prop -->
    <v-icon v-if="icon" right dark>{{ icon }}</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: "ActionButton",
  // Define the props for the component
  props: {
    text: {
      type: String,
      default: "Button"
    },
    color: {
      type: String,
      default: "grey"
    },
    icon: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
};
</script>