<template>
    <v-container>
        <v-card>
            <v-card-title>Gestion de Asignaturas</v-card-title>
            <v-card-text>
                <v-form @submit.prevent="guardarAsignatura">
                    <v-text-field
                        v-model="form.clave"
                        label="Clave"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="form.nombre"
                        label="Nombre"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="form.creditos"
                        label="Creditos"
                        required
                    ></v-text-field>

                    <v-btn type="submit" color="primary" class="mt-3">
                        {{  modoEditar ? 'Actualizar' : 'Guardar' }}
                    </v-btn>
                </v-form>

                <v-data-table
                    :headers="headers"
                    :items="asignaturas"
                    class="mt-5"
                    item-value="id"
                >
                    <template v-slot:item.actions="{ item }">
                        <v-btn icon @click="editarAsignatura(item)">
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn icon @click="eliminarAsignatura(item.clave)">
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
            asignaturas: [],
            form: {
                id: null,
                clave: null,
                nombre: '',
                creditos: null
            },
            headers: [
                { title: 'ID', key: 'id' },
                { title: 'Clave', key: 'clave' },
                { title: 'Nombre', key: 'nombre' },
                { title: 'Creditos', key: 'creditos' },
                { title: 'Acciones', key: 'actions', sortable: false}
            ],
            modoEditar: false
        };
    },
    created() {
        this.obtenerAsignaturas();
    },
    methods: {
        async obtenerAsignaturas(){
            try {
                const res = await axios.get('http://localhost:3000/asignaturas');
                this.asignaturas = res.data;
            } catch ( error ){
                console.error('Error al obtener asignaturas: ', error);
            }
        },
        async guardarAsignatura() {
        try {
            if (this.modoEditar) {
            await axios.patch(`http://localhost:3000/asignaturas/${this.form.clave}`, {
                nombre: this.form.nombre,
                creditos: this.form.creditos
            });
            } else {
            await axios.post('http://localhost:3000/asignaturas', {
                clave: this.form.clave,
                nombre: this.form.nombre,
                creditos: this.form.creditos
            });
            }
            this.reiniciarFormulario();
            this.obtenerAsignaturas();
        } catch (err) {
            console.error('Error al guardar asignatura:', err);
        }
        },
        editarAsignatura(asignatura) {
        this.form = {
            id: asignatura.id,
            clave: asignatura.clave,
            nombre: asignatura.nombre,
            creditos: asignatura.creditos
        };
        this.modoEditar = true;
        },
        async eliminarAsignatura(clave) {
        try {
            await axios.delete(`http://localhost:3000/asignatura/${clave}`);
            this.obtenerAsignaturas();
        } catch (err) {
            console.error('Error al eliminar asignatura:', err);
        }
        },
        reiniciarFormulario() {
            this.form = { id: null, clave: null, nombre: '', creditos: null };
            this.modoEditar = false;
        }
    }
};
</script>