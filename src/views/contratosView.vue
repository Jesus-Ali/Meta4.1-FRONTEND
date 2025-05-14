<template>
  <v-container>
    <v-card>
      <v-card-title>Gestión de Contratos</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="guardarContrato">
          <v-text-field
            v-model="form.docenteNumEmpleado"
            label="Numero del Empleado"
            required
          ></v-text-field>
          <v-text-field
            v-model="form.asignaturaClave"
            label="Clave de Asignatura"
            required
          ></v-text-field>

          <v-btn type="submit" color="primary" class="mt-3">
            {{ modoEditar ? 'Actualizar' : 'Guardar' }}
          </v-btn>
        </v-form>

        <v-data-table
          :headers="headers"
          :items="contratos"
          class="mt-5"
          item-value="id"
        >

        <template v-slot:item.docenteNombre="{ item }">
          {{ item.Docente?.Persona?.nombre || 'N/A' }}
        </template>

        <template v-slot:item.docenteEmail="{ item }">
          {{ item.Docente?.Persona?.email || 'N/A' }}
        </template>

        <template v-slot:item.docenteCategoria="{ item }">
          {{ item.Docente?.CategoriaEmpleado?.nombre || 'N/A' }}
        </template>

        <template v-slot:item.asignaturaNombre="{ item }" >
          {{  item.Asignatura?.nombre || 'N/A' }}
        </template>
        <template v-slot:item.asignaturaCreditos="{ item }" >
          {{  item.Asignatura?.creditos || 'N/A' }}
        </template>

          <template v-slot:item.actions="{ item }">
            <v-btn icon @click="editarContrato(item)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon @click="eliminarContrato(item.id)">
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
      contratos: [],
      form: {
        id: null,
        docenteNumEmpleado: null,
        asignaturaClave: null
      },
      headers: [
        { title: 'ID', key: 'id' },
        { title: 'Num. del Empleado', key: 'docenteNumEmpleado' },
        { title: 'Nombre Docente', key: 'docenteNombre' },
        { title: 'Email Docente', key: 'docenteEmail' },
        { title: 'Categoria Docente', key: 'docenteCategoria' },
        { title: 'Clave de Asignatura', key: 'asignaturaClave' },
        { title: 'Nombre de Asignatura', key: 'asignaturaNombre' },
        { title: 'Creditos de Asignatura', key: 'asignaturaCreditos' },
        { title: 'Acciones', key: 'actions', sortable: false }
      ],
      modoEditar: false
    };
  },
  created() {
    this.obtenerContratos();
  },
  methods: {
    async obtenerContratos() {
      try {
        const res = await axios.get('http://localhost:3000/contratos');
        this.contratos = res.data;
      } catch (error) {
        console.error('Error al obtener contratos:', error);
      }
    },
    async guardarContrato() {
      try {
        if (this.modoEditar) {
          await axios.patch(`http://localhost:3000/contratos/${this.form.id}`, {
            docenteNumEmpleado: this.form.docenteNumEmpleado,
            asignaturaClave: this.form.asignaturaClave
          });
        } else {
          await axios.post('http://localhost:3000/contratos', {
            docenteNumEmpleado: this.form.docenteNumEmpleado,
            asignaturaClave: this.form.asignaturaClave
          });
        }
        this.reiniciarFormulario();
        this.obtenerContratos();
      } catch (err) {
        console.error('Error al guardar contrato:', err);
      }
    },
    editarContrato(contrato) {
      this.form = {
        id: inscripcion.id,
        docenteNumEmpleado: contrato.docenteNumEmpleado,
        asignaturaClave: contrato.asignaturaClave,
      };
      this.modoEditar = true;
    },
    async eliminarContrato(id) {
      try {
        await axios.delete(`http://localhost:3000/inscripciones/${id}`);
        this.obtenerContratos();
      } catch (err) {
        console.error('Error al eliminar contrato:', err);
      }
    },
    reiniciarFormulario() {
      this.form = { id: null,
        docenteNumEmpleado: null,
        asignaturaClave: null
      };
      this.modoEditar = false;
    }
  }
};
</script>
