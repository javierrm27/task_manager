<template>
  <!-- The root Vue application element -->
  <v-app>
    <!-- Spinner component for displaying loading indicators -->
    <spinner></spinner>

    <!-- Card to contain the application content -->
    <v-card class="overflow-hidden">
      <!-- Application bar at the top -->
      <v-app-bar
        clipped-left
        :collapse="false"
        :collapse-on-scroll="false"
        absolute
        color="white"
        scroll-target="#scrolling-techniques-6"
        app
      >
        <!-- Application logo -->
        <v-img src="../../assets/logo.png" max-width="200" containx></v-img>
        <!-- Application title -->
        <v-toolbar-title> Task Manager </v-toolbar-title>
      </v-app-bar>

      <!-- Container for scrollable content -->
      <v-sheet
        id="scrolling-techniques-6"
        class="overflow-y-auto"
        max-height="100vh"
        min-height="100vh"
      >
        <!-- Main content of the application -->
        <v-main id="main-view" class="main-view">
          <!-- Router view for rendering different pages based on the route -->
          <router-view />
        </v-main>
      </v-sheet>
    </v-card>
  </v-app>
</template>

<script src="./App.js"></script>
<style src="./App.scss" lang="scss" />
