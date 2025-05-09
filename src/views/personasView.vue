<template>
    <v-container>
        <v-card>
            <v-card-title>Gestion de Personas</v-card-title>
            <v-card-text>
                <v-form @submit.prevent="guardarPersona">
                    <v-text-field
                        v-model="form.nombre"
                        label="Nombre"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="form.email"
                        label="Email"
                        required
                    ></v-text-field>

                    <v-btn type="submit" color="primary" class="mt-3">
                        {{  modoEditar ? 'Actualizar' : 'Guardar' }}
                    </v-btn>
                </v-form>

                <v-data-table
                    :headers="headers"
                    :items="personas"
                    class="mt-5"
                    item-value="id"
                >
                    <template v-slot:item.actions="{ item }">
                        <v-btn icon @click="editarPersona(item)">
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn icon @click="eliminarPersona(item.id)">
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
            personas: [],
            form: {
                id: null,
                nombre: '',
                email: ''
            },
            headers: [
                { title: 'ID', key: 'id' },
                { title: 'Nombre', key: 'nombre' },
                { title: 'Email', key: 'email' },
                { title: 'Acciones', key: 'actions', sortable: false}
            ],
            modoEditar: false
        };
    },
    created() {
        this.obtenerPersonas();
    },
    methods: {
        async obtenerPersonas(){
            try {
                const res = await axios.get('http://localhost:3000/personas');
                this.personas = res.data;
            } catch ( error ){
                console.error('Error al obtener personas: ', error);
            }
        },
        async guardarPersona() {
        try {
            if (this.modoEditar) {
            await axios.put(`http://localhost:3000/personas/${this.form.id}`, {
                nombre: this.form.nombre,
                email: this.form.email
            });
            } else {
            await axios.post('http://localhost:3000/personas', {
                nombre: this.form.nombre,
                email: this.form.email
            });
            }
            this.reiniciarFormulario();
            this.obtenerPersonas();
        } catch (err) {
            console.error('Error al guardar persona:', err);
        }
        },
        editarPersona(persona) {
        this.form = {
            id: persona.id,
            nombre: persona.nombre,
            email: persona.email
        };
        this.modoEditar = true;
        },
        async eliminarPersona(id) {
        try {
            await axios.delete(`http://localhost:3000/personas/${id}`);
            this.obtenerPersonas();
        } catch (err) {
            console.error('Error al eliminar persona:', err);
        }
        },
        reiniciarFormulario() {
            this.form = { id: null, nombre: '', email: '' };
            this.modoEditar = false;
        }
    }
};
</script>