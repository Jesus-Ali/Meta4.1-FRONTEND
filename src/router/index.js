import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/homeView.vue';
import PersonasView from '../views/personasView.vue';
import EstudiantesView from '../views/estudiantesView.vue';
import categoriaEmpleadoView from '../views/categoriaEmpleadoView.vue';
import docentesView from '../views/docentesView.vue';
import AsignaturasView from '../views/asignaturasView.vue';
import InscripcionesView from '../views/inscripcionesView.vue';
import ContratosView from '../views/contratosView.vue';
import { components } from 'vuetify/dist/vuetify.js';

const routes = [
  { path: '/', component: HomeView },
  { path: '/personas', component: PersonasView },
  { path: '/estudiantes', component: EstudiantesView },
  { path: '/asignaturas', component: AsignaturasView},
  { path: '/categoriaempleado', component: categoriaEmpleadoView},
  { path: '/docentes', component: docentesView},
  { path: '/inscripciones', component: InscripcionesView},
  { path: '/contratos', component: ContratosView}
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
