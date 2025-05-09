<template>
  <v-container>
    <v-card>
      <v-card-title>Gestión de Docentes</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="guardarDocente">
          <v-text-field
            v-model="form.matricula"
            label="Matrícula"
            required
          ></v-text-field>
          <v-text-field
            v-model="form.personaId"
            label="ID de Persona"
            required
          ></v-text-field>

          <v-btn type="submit" color="primary" class="mt-3">
            {{ modoEditar ? 'Actualizar' : 'Guardar' }}
          </v-btn>
        </v-form>

        <v-data-table
          :headers="headers"
          :items="estudiantes"
          class="mt-5"
          item-value="id"
        >
          <template v-slot:item.persona="{ item }">
            {{ item.Persona?.nombre }}
          </template>

          <template v-slot:item.email="{ item }">
            {{ item.Persona?.email }}
          </template>

          <template v-slot:item.actions="{ item }">
            <v-btn icon @click="editarEstudiante(item)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon @click="eliminarEstudiante(item.id)">
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
      estudiantes: [],
      form: {
        id: null,
        matricula: '',
        personaId: ''
      },
      headers: [
        { title: 'ID', key: 'id' },
        { title: 'Matrícula', key: 'matricula' },
        { title: 'Persona', key: 'personaId' },
        { title: 'Nombre',  key: 'persona'},
        {title: 'Email', key: 'email'},
        { title: 'Acciones', key: 'actions', sortable: false }
      ],
      modoEditar: false
    };
  },
  created() {
    this.obtenerEstudiantes();
  },
  methods: {
    async obtenerEstudiantes() {
      try {
        const res = await axios.get('http://localhost:3000/estudiantes');
        this.estudiantes = res.data;
      } catch (error) {
        console.error('Error al obtener estudiantes:', error);
      }
    },
    async guardarEstudiante() {
      try {
        if (this.modoEditar) {
          await axios.put(`http://localhost:3000/estudiantes/${this.form.id}`, {
            matricula: this.form.matricula,
            personaId: this.form.personaId
          });
        } else {
          await axios.post('http://localhost:3000/estudiantes', {
            matricula: this.form.matricula,
            personaId: this.form.personaId
          });
        }
        this.reiniciarFormulario();
        this.obtenerEstudiantes();
      } catch (err) {
        console.error('Error al guardar estudiante:', err);
      }
    },
    editarEstudiante(estudiante) {
      this.form = {
        id: estudiante.id,
        matricula: estudiante.matricula,
        personaId: estudiante.personaId
      };
      this.modoEditar = true;
    },
    async eliminarEstudiante(id) {
      try {
        await axios.delete(`http://localhost:3000/estudiantes/${id}`);
        this.obtenerEstudiantes();
      } catch (err) {
        console.error('Error al eliminar estudiante:', err);
      }
    },
    reiniciarFormulario() {
      this.form = { id: null, matricula: '', personaId: '' };
      this.modoEditar = false;
    }
  }
};
</script>
