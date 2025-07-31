<template>
  <div
    class="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat relative"
    style="background-image: url('https://images.unsplash.com/photo-1506744038136-46273834b3fb')"
  >
    <!-- Overlay oscuro con gradiente -->
    <div class="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-emerald-900/70"></div>

    <!-- Contenedor del formulario -->
    <div
      class="relative z-10 w-full max-w-md p-8 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl text-white"
    >
      <h2 class="text-3xl font-bold text-center mb-6">Iniciar sesión</h2>

      <form @submit.prevent="handleLogin" class="space-y-5">
        <div>
          <label for="email" class="block text-sm font-medium mb-1">Correo electrónico</label>
          <input
            v-model="form.email"
            type="email"
            placeholder="correo@ejemplo.com"
            class="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-300"
          />
          <p v-if="errors.email" class="text-amber-300 text-sm mt-2">{{ errors.email }}</p>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium mb-1">Contraseña</label>
          <input
            v-model="form.password"
            type="password"
            placeholder="••••••••"
            class="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-300"
          />
          <p v-if="errors.password" class="text-amber-300 text-sm mt-2">{{ errors.password }}</p>
        </div>

        <button
          type="submit"
          class="w-full mt-4 bg-gradient-to-r from-emerald-400 to-emerald-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-emerald-500 hover:to-emerald-700 transition-all shadow-lg hover:shadow-emerald-500/20 cursor-pointer"
        >
          Ingresar
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
import * as yup from 'yup'

const authStore = useAuthStore()
const router = useRouter()

// Validaciones y sanitización
const loginSchema = yup.object({
  email: yup
    .string()
    .required('El correo es obligatorio')
    .email('Correo inválido')
    .transform((val: string) => val.trim().toLowerCase()),

  password: yup
    .string()
    .required('La contraseña es obligatoria')
    .transform((val: string) => val.trim())
    .min(6, 'Mínimo 6 caracteres'),
})

const form = reactive({
  email: '',
  password: '',
})

const errors = reactive({
  email: '',
  password: '',
})

const handleLogin = async () => {
  try {
    // Validar y sanitizar
    const validatedData = await loginSchema.validate(form, {
      abortEarly: false, // para obtener todos los errores
    })

    // Si todo está bien, limpiar errores anteriores
    errors.email = ''
    errors.password = ''

    await authStore.login(validatedData)

    // Redirige según el rol
    if (authStore.user?.role === 'admin') {
      router.push('/dashboard')
    } else {
      router.push('/')
    }
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      error.inner.forEach((e: any) => {
        errors[e.path as 'email' | 'password'] = e.message
      })
    } else if (error.response && error.response.status === 401) {
      // 💥 Aquí se captura el error del backend por credenciales inválidas
      const mensaje = error.response.data?.error || 'Credenciales incorrectas'
      errors.email = mensaje
      errors.password = mensaje
    } else {
      // ⚠️ Errores inesperados (servidor caído, sin conexión, etc.)
      alert('Error inesperado en el servidor. Intenta más tarde.')
    }
  }
}
</script>
