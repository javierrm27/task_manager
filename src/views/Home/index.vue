<template>
  <!-- Home component template -->
  <v-container>
    <v-layout>
      <v-row>
        <v-col cols="12">
          <!-- Render action buttons using a loop based on 'actions' array -->
          <actionButton
            v-for="action in actions"
            :key="action.text"
            :text="action.text"
            :color="action.color"
            :icon="action.icon"
            @button-action="openDialog(action.dialog)"
            class="float-right"
          />
        </v-col>
        <v-col cols="12">
          <!-- Render the 'tasksList' component to display tasks in tabular form -->
          <tasksList :items="tasks" :itemsPerPage="10" />
        </v-col>
      </v-row>
      <!-- Dynamic rendering of dialog components based on 'dialogComponents' array -->
      <component
        v-for="dialog in dialogComponents"
        :key="dialog.dialog"
        :is="dialog.component"
        :dialog="dialogs[dialog.dialog]"
        :task="$store.getters.getTaskFound"
        :dialogTitle="dialog.title"
        :action="dialog.action"
        :text="dialog.text"
        :nextDialog="dialog.nextDialog"
        @cancel-action="closeDialog(dialog.dialog)"
        @save-action="executeAction"
        @task-found-action="openDialog"
      />
    </v-layout>
  </v-container>
</template>

<script src="./home.js"></script>
<style src="./home.scss" lang="scss" />