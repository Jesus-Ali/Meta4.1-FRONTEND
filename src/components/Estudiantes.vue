<!-- <template>
    <v-container>
      <v-text-field v-model="matricula" label="Buscar por matrícula" />
      <v-btn @click="buscarEstudiante">Buscar</v-btn>
  
      <v-card v-if="estudiante">
        <v-card-title>{{ estudiante.Persona.nombre }}</v-card-title>
        <v-card-subtitle>Matrícula: {{ estudiante.matricula }}</v-card-subtitle>
        <v-card-text>
          <h4>Asignaturas inscritas:</h4>
          <v-list>
            <v-list-item
              v-for="insc in estudiante.Inscripcions"
              :key="insc.asignaturaId"
            >
              <v-list-item-title>
                {{ insc.Asignatura.nombre }} ({{ insc.calificacion }})
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import axios from '@/services/api'
  
  const matricula = ref('')
  const estudiante = ref(null)
  
  const buscarEstudiante = async () => {
    try {
      const res = await axios.get(`/estudiantes/matricula/${matricula.value}`)
      estudiante.value = res.data
    } catch (err) {
      estudiante.value = null
      alert('Estudiante no encontrado')
    }
  }
  </script>
   -->