import tasksList from '@/components/TasksList.vue'
import taskFormDialog from '@/components/TaskFormDialog.vue'
import idSearchDialog from '@/components/IdSearchDialog.vue'

export default {
  name: 'Home',
  components: {
    tasksList,
    taskFormDialog,
    idSearchDialog
  },
  data: () => ({
    // Data properties for managing dialog states, actions, and components
    dialogs: {
      createTask: false,
      searchIdEdit: false,
      editTask: false,
      searchIdDelete: false,
      confirmDelete: false
    },
    actions: [
      // Array to define action buttons with properties
      { text: 'Create', color: 'green', icon: 'mdi-plus', dialog: 'createTask' },
      { text: 'Edit', color: 'orange', icon: 'mdi-pencil', dialog: 'searchIdEdit' },
      { text: 'Delete', color: 'red', icon: 'mdi-delete', dialog: 'searchIdDelete' },
    ],
    dialogComponents: [
      // Array to define dialog components with properties
      { dialog: 'createTask', component: 'taskFormDialog', title: 'Task Creation', action: 'create' },
      { dialog: 'searchIdEdit', component: 'idSearchDialog', title: 'Task Editing', action: 'edit', nextDialog: 'editTask' },
      { dialog: 'editTask', component: 'taskFormDialog', title: 'Task Editing', action: 'edit' },
      { dialog: 'searchIdDelete', component: 'idSearchDialog', title: 'Delete Task', action: 'delete', nextDialog: 'confirmDelete' },
      { dialog: 'confirmDelete', component: 'confirmationDialog', title: 'Delete Task', action: 'delete', text: 'You are going to delete a task. This action is irreversible. Are you sure?'},
    ]
  }),
  computed: {
    // Computed property to get tasks from the store
    tasks() {
      return this.$store.getters.getAllTasks;
    }
  },
  beforeMount(){
    // Fetch tasks from the store before mounting the component
    this.fetchTasks();
  },
  methods: {
    // Method to fetch tasks from local storage
    fetchTasks() {
      this.$store.dispatch('fetchAllTasks');
    },
    // Method to open a dialog
    openDialog(dialogName) {
      this.dialogs[dialogName] = true;
    },
    // Method to close a dialog
    closeDialog(dialogName) {
      this.dialogs[dialogName] = false;
    },
    // Method to execute an action based on user interactions
    executeAction({ action, task = null }) {
      this.$store.dispatch("setSpinner", true);
      if (action === 'create') {
        //Executes the method to create a new task
        this.$store.dispatch('createTask', task);
        this.closeDialog('createTask');
      } else if (action === 'edit') {
        //Executes the method to save an edited task
        this.$store.dispatch('editTask', task);
        this.closeDialog('searchIdEdit');
        this.closeDialog('editTask');
      } else if (action === 'delete') {
        //Executes the method to delete the selected task
        this.$store.dispatch('deleteTaskByID', this.$store.getters.getTaskFound.id);
        this.closeDialog('searchIdDelete');
        this.closeDialog('confirmDelete');
      }
      this.$store.dispatch("setSpinner", false);
    }
  }
};