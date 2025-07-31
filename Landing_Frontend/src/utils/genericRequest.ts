import axios from 'axios'
import axiosAuth from './axiosAuth'

// Tipos de métodos HTTP permitidos
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

// Base URL desde variables de entorno
const baseURL = import.meta.env.VITE_API_URL

// Request genérico para hacer peticiones a la API
export const genericRequest = async (url: string, method: HttpMethod, body?: any) => {
  try {
    const response = await axios({
      url: `${baseURL}${url}`,
      method,
      headers: {
        Accept: 'application/json',
      },
      data: body,
    })
    return response.data
  } catch (error: any) {
    console.error(`Error en genericRequest: ${error.message}`, {
      url,
      method,
      body,
      error,
    })
    throw error
  }
}

// Request genérico con autenticación para hacer peticiones a la API
export const genericRequestAuth = async (url: string, method: HttpMethod, body?: any) => {
  try {
    const response = await axiosAuth({
      url: url,
      method: method,
      data: body,
    })
    return response.data
  } catch (error: any) {
    console.error(`Error en genericRequest: ${error.message}`, {
      url,
      method,
      body,
      error,
    })
    throw error
  }
}
