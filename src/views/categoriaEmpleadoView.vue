<template>
  <v-container>
    <v-card>
      <v-card-title>Gestión de Categorias</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="guardarCategoria">
          <v-text-field
            v-model="form.clave"
            label="Clave"
            required
            :readonly="modoEditar"
          ></v-text-field>
          <v-text-field
            v-model="form.nombre"
            label="Nombre"
            required
          ></v-text-field>

          <v-btn type="submit" color="primary" class="mt-3">
            {{ modoEditar ? 'Actualizar' : 'Guardar' }}
          </v-btn>
        </v-form>

        <v-data-table
          :headers="headers"
          :items="categorias"
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
            <v-btn icon @click="editarCategoria(item)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon @click="eliminarCategoria(item.clave)">
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
      categorias: [],
      form: {
        id: null,
        clave: null,
        nombre: ''
      },
      headers: [
        { title: 'ID', key: 'id' },
        { title: 'Clave', key: 'clave' },
        { title: 'Nombre', key: 'nombre' },
        { title: 'Acciones', key: 'actions', sortable: false }
      ],
      modoEditar: false
    };
  },
  created() {
    this.obtenerCategorias();
  },
  methods: {
    async obtenerCategorias() {
      try {
        const res = await axios.get('http://localhost:3000/categoriaempleado');
        this.categorias = res.data;
      } catch (error) {
        console.error('Error al obtener categorias:', error);
      }
    },
    async guardarCategoria() {
      try {
        if (this.modoEditar) {
          await axios.put(`http://localhost:3000/categoriaempleado/${this.form.clave}`, {
            clave: this.form.clave,
            nombre: this.form.nombre
          });
        } else {
          await axios.post('http://localhost:3000/categoriaempleado', {
            clave: this.form.clave,
            nombre: this.form.nombre
          });
        }
        this.reiniciarFormulario();
        this.obtenerCategorias();
      } catch (err) {
        console.error('Error al guardar categoria:', err);
      }
    },
    editarCategoria(categoria) {
      this.form = {
        id: categoria.id,
        clave: categoria.clave,
        nombre: categoria.nombre
      };
      this.modoEditar = true;
    },
    async eliminarCategoria(clave) {
      try {
        await axios.delete(`http://localhost:3000/categoriaempleado/${clave}`);
        this.obtenerCategorias();
      } catch (err) {
        console.error('Error al eliminar categoria:', err);
      }
    },
    reiniciarFormulario() {
      this.form = { id: null, clave: null, nombre: '' };
      this.modoEditar = false;
    }
  }
};
</script>
