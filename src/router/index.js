import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/homeView.vue';
import PersonasView from '../views/personasView.vue';
import EstudiantesView from '../views/estudiantesView.vue';
import AsignaturasView from '../views/asignaturasView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/personas', component: PersonasView },
  { path: '/estudiantes', component: EstudiantesView },
  { path: '/asignaturas', component: AsignaturasView}
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
