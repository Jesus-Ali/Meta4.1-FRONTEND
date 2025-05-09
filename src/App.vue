<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>Gestión Escolar</v-toolbar-title>
      <v-spacer>
      </v-spacer>
      <v-btn to="/" text>Home</v-btn>
      <v-btn to="/personas" text>Personas</v-btn>
      <v-btn to="/estudiantes" text>Estudiantes</v-btn>
      <v-btn to="/asignaturas" text>Asignaturas</v-btn>
      <v-btn to="/categoriaempleado" text>Categoria Empleado</v-btn>
      <v-btn to="/inscripciones" text>Inscripciones</v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
