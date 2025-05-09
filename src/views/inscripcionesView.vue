<template>
  <v-container>
    <v-card>
      <v-card-title>Gestión de Inscripciones</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="guardarInscripcion">
          <v-text-field
            v-model="form.estudianteId"
            label="ID de Estudiante"
            required
            :readonly="modoEditar"
          ></v-text-field>
          <v-text-field
            v-model="form.asignaturaId"
            label="ID de Asignatura"
            required
            :readonly="modoEditar"
          ></v-text-field>
          <v-text-field
            v-model="form.semestre"
            label="Semestre"
            required
          ></v-text-field>
          <v-text-field
            v-model="form.calificacion"
            label="Calificacion"
            required
          ></v-text-field>

          <v-btn type="submit" color="primary" class="mt-3">
            {{ modoEditar ? 'Actualizar' : 'Guardar' }}
          </v-btn>
        </v-form>

        <v-data-table
          :headers="headers"
          :items="inscripciones"
          class="mt-5"
          item-value="id"
        >
          <!-- <template v-slot:item.persona="{ item }">
            {{ item.Persona?.nombre }}
          </template>

          <template v-slot:item.email="{ item }">
            {{ item.Persona?.email }}
          </template> -->

          <template v-slot:item.actions="{ item }">
            <v-btn icon @click="editarInscripcion(item)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon @click="eliminarInscripcion(item.estudianteId, item.asignaturaId)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      inscripciones: [],
      form: {
        id: null,
        estudianteId: null,
        asignaturaId: null,
        semestre: null,
        calificacion: null
      },
      headers: [
        { title: 'ID', key: 'id' },
        { title: 'Estudiante ID', key: 'estudianteId' },
        { title: 'Asignatura ID', key: 'asignaturaId' },
        { title: 'Semestre',  key: 'semestre'},
        {title: 'Calificacion', key: 'calificacion'},
        { title: 'Acciones', key: 'actions', sortable: false }
      ],
      modoEditar: false
    };
  },
  created() {
    this.obtenerInscripciones();
  },
  methods: {
    async obtenerInscripciones() {
      try {
        const res = await axios.get('http://localhost:3000/inscripciones');
        this.inscripciones = res.data;
      } catch (error) {
        console.error('Error al obtener inscripciones:', error);
      }
    },
    async guardarInscripcion() {
      try {
        if (this.modoEditar) {
          await axios.patch(`http://localhost:3000/inscripciones/${this.form.estudianteId}/${this.form.asignaturaId}`, {
            semestre: this.form.semestre,
            calificacion: this.form.calificacion
          });
        } else {
          await axios.post('http://localhost:3000/inscripciones', {
            estudianteId: this.form.estudianteId,
            asignaturaId: this.form.asignaturaId,
            semestre: this.form.semestre,
            calificacion: this.form.calificacion
          });
        }
        this.reiniciarFormulario();
        this.obtenerInscripciones();
      } catch (err) {
        console.error('Error al guardar inscripcion:', err);
      }
    },
    editarInscripcion(inscripcion) {
      this.form = {
        id: inscripcion.id,
        estudianteId: inscripcion.estudianteId,
        asignaturaId: inscripcion.asignaturaId,
        semestre: inscripcion.semestre,
        calificacion: inscripcion.calificacion
      };
      this.modoEditar = true;
    },
    async eliminarInscripcion(estudianteId, asignaturaId) {
      try {
        await axios.delete(`http://localhost:3000/inscripciones/${estudianteId}/${asignaturaId}`);
        this.obtenerInscripciones();
      } catch (err) {
        console.error('Error al eliminar inscripcion:', err);
      }
    },
    reiniciarFormulario() {
      this.form = { id: null,
        estudianteId: null,
        asignaturaId: null,
        semestre: null,
        calificacion: null
      };
      this.modoEditar = false;
    }
  }
};
</script>
