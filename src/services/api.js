import axios from 'axios'

export default axios.create({
  baseURL: 'http://localhost:3000', // Cambia al puerto real de tu backend
})
