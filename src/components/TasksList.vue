<template>
<!-- Display a Vuetify data table with the specified headers, items, and items per page -->
  <v-data-table
    :headers="headers"
    :items="items"
    :items-per-page="itemsPerPage"
    class="elevation-1"
  ></v-data-table>
</template>

<script>
export default {
  name: "TasksList",
  props: {
    // Define the props for the component
    items: {
      type: Array,
    },
    itemsPerPage: {
      type: Number,
      default: 5,
    },
  },
  data: () => ({
    // Define the headers for the data table
    headers: [
      {
        text: "ID",
        align: "start",
        sortable: true,
        value: "id",
      },
      {
        text: "Title",
        align: "start",
        sortable: true,
        value: "title",
      },
      {
        text: "Description",
        align: "start",
        sortable: false,
        value: "description",
      },
      {
        text: "Due Date",
        align: "start",
        sortable: true,
        value: "due_date",
      },
      {
        text: "Status",
        align: "start",
        sortable: true,
        value: "status",
      },
    ],
  })
};
</script>
