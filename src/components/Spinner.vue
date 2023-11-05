<template>
  <!-- A loading spinner overlay that is displayed when the 'spinner' value is true -->
  <v-overlay :value="spinner">
    <v-progress-circular
      indeterminate
      color="primary"
      size="64"
    ></v-progress-circular>
  </v-overlay>
</template>

<script>
export default{
    name: 'Spinner',
    computed: {
        spinner() {
          // Computed property that retrieves the spinner status from the Vuex store
          return this.$store.getters.getSpinnerStatus;
        }
    }
}
</script>
