<template>
  <v-container>
    <v-card>
      <v-card-title>Gestión de Docentes</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="guardarDocente">
          <v-text-field
            v-model="form.numEmpleado"
            label="Numero de Empleado"
            required
          ></v-text-field>
          <v-text-field
            v-model="form.personaId"
            label="ID de Persona"
            required
          ></v-text-field>
          <v-text-field
            v-model="form.categoriaEmpleadoClave"
            label="Clave de Categoria de Empleado"
            required
          ></v-text-field>

          <v-btn type="submit" color="primary" class="mt-3">
            {{ modoEditar ? 'Actualizar' : 'Guardar' }}
          </v-btn>
        </v-form>

        <v-data-table
          :headers="headers"
          :items="docentes"
          class="mt-5"
          item-value="id"
        >
          <template v-slot:item.persona="{ item }">
            {{ item.Persona?.nombre }}
          </template>

          <template v-slot:item.email="{ item }">
            {{ item.Persona?.email }}
          </template>

          <template v-slot:item.categoria="{ item }">
            {{ item.CategoriaEmpleado?.nombre }}
          </template>



          <template v-slot:item.actions="{ item }">
            <v-btn icon @click="editarDocente(item)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon @click="eliminarDocente(item.id)">
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
      docentes: [],
      form: {
        id: null,
        numEmpleado: null,
        personaId: '',
        categoriaEmpleadoClave: null
      },
      headers: [
        { title: 'ID', key: 'id' },
        { title: 'Numero de Empleado', key: 'numEmpleado'},
        { title: 'ID de Persona', key: 'personaId'},
        { title: 'Nombre', key: 'persona'},
        { title: 'Email', key: 'email'},
        { title: 'Clave de Categoria de Empleado', key: 'categoriaEmpleadoClave'},
        { title: 'Nombre de Categoria de Empleado', key: 'categoria'},
        { title: 'Acciones', key: 'actions', sortable: false }
      ],
      modoEditar: false
    };
  },
  created() {
    this.obtenerDocentes();
  },
  methods: {
    async obtenerDocentes() {
      try {
        const res = await axios.get('http://localhost:3000/docentes');
        this.docentes = res.data;
      } catch (error) {
        console.error('Error al obtener docentes:', error);
      }
    },
    async guardarDocente() {
      try {
        if (this.modoEditar) {
          await axios.put(`http://localhost:3000/docentes/${this.form.id}`, {
            numEmpleado: this.form.numEmpleado,
            personaId: this.form.personaId,
            categoriaEmpleadoClave: this.form.categoriaEmpleadoClave
          });
        } else {
          await axios.post('http://localhost:3000/docentes', {
            numEmpleado: this.form.numEmpleado,
            personaId: this.form.personaId,
            categoriaEmpleadoClave: this.form.categoriaEmpleadoClave
          });
        }
        this.reiniciarFormulario();
        this.obtenerDocentes();
      } catch (err) {
        console.error('Error al guardar docente:', err);
      }
    },
    editarDocente(docente) {
      this.form = {
        id: docente.id,
        numEmpleado: docente.numEmpleado,
        personaId: docente.personaId,
        categoriaEmpleadoClave: docente.categoriaEmpleadoClave
      };
      this.modoEditar = true;
    },
    async eliminarDocente(id) {
      try {
        await axios.delete(`http://localhost:3000/docentes/${id}`);
        this.obtenerDocentes();
      } catch (err) {
        console.error('Error al eliminar docente:', err);
      }
    },
    reiniciarFormulario() {
      this.form = { id: null,
        numEmpleado: null,
        personaId: '',
        categoriaEmpleadoClave: null };
      this.modoEditar = false;
    }
  }
};
</script>
