<template>
  <v-container>
    <v-card>
      <v-card-title>Gestión de Inscripciones</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="guardarInscripcion">
          <v-text-field
            v-model="form.estudianteMatricula"
            label="Mat. de Estudiante"
            required
          ></v-text-field>
          <v-text-field
            v-model="form.asignaturaClave"
            label="Clave de Asignatura"
            required
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

        <template v-slot:item.estudianteNombre="{ item }">
          {{ item.Estudiante?.Persona?.nombre || 'N/A' }}
        </template>

        <template v-slot:item.estudianteEmail="{ item }">
          {{ item.Estudiante?.Persona?.email || 'N/A' }}
        </template>
        <template v-slot:item.asignaturaNombre="{ item }" >
          {{  item.Asignatura?.nombre || 'N/A' }}
        </template>
        <template v-slot:item.asignaturaCreditos="{ item }" >
          {{  item.Asignatura?.creditos || 'N/A' }}
        </template>

          <template v-slot:item.actions="{ item }">
            <v-btn icon @click="editarInscripcion(item)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon @click="eliminarInscripcion(item.id)">
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
        estudianteMatricula: null,
        asignaturaClave: null,
        semestre: null,
        calificacion: null
      },
      headers: [
        { title: 'ID', key: 'id' },
        { title: 'Mat. de Estudiante', key: 'estudianteMatricula' },
        { title: 'Nombre Estudiante', key: 'estudianteNombre' },
        { title: 'Email Estudiante', key: 'estudianteEmail' },
        { title: 'Clave de Asignatura', key: 'asignaturaClave' },
        { title: 'Nombre de Asignatura', key: 'asignaturaNombre' },
        { title: 'Creditos de Asignatura', key: 'asignaturaCreditos' },
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
          await axios.patch(`http://localhost:3000/inscripciones/${this.form.id}`, {
            semestre: this.form.semestre,
            calificacion: this.form.calificacion
          });
        } else {
          await axios.post('http://localhost:3000/inscripciones', {
            estudianteMatricula: this.form.estudianteMatricula,
            asignaturaClave: this.form.asignaturaClave,
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
        estudianteMatricula: inscripcion.estudianteMatricula,
        asignaturaClave: inscripcion.asignaturaClave,
        semestre: inscripcion.semestre,
        calificacion: inscripcion.calificacion
      };
      this.modoEditar = true;
    },
    async eliminarInscripcion(id) {
      try {
        await axios.delete(`http://localhost:3000/inscripciones/${id}}`);
        this.obtenerInscripciones();
      } catch (err) {
        console.error('Error al eliminar inscripcion:', err);
      }
    },
    reiniciarFormulario() {
      this.form = { id: null,
        estudianteMatricula: null,
        asignaturaClave: null,
        semestre: null,
        calificacion: null
      };
      this.modoEditar = false;
    }
  }
};
</script>
