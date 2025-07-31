<template>
  <div
    class="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 overflow-hidden w-full max-w-md mx-auto lg:mx-0"
  >
    <div class="p-8">
      <div class="mb-6 text-center">
        <h2 class="text-2xl font-bold text-white">Contáctanos</h2>
        <p class="text-emerald-100 mt-2">Completa el formulario y nos pondremos en contacto</p>
      </div>

      <form class="space-y-5" @submit.prevent="handleSubmit">
        <div>
          <label class="block text-sm font-medium text-white/80 mb-1">Nombre completo</label>
          <input
            v-model="form.name"
            type="text"
            class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-transparent transition"
            placeholder="Tu nombre"
          />
          <p v-if="errors.name" class="text-amber-300 text-sm mt-2">{{ errors.name }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-white/80 mb-1">Correo electrónico</label>
          <input
            v-model="form.email"
            type="email"
            class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-transparent transition"
            placeholder="tu@email.com"
          />
          <p v-if="errors.email" class="text-amber-300 text-sm mt-2">{{ errors.email }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-white/80 mb-1">Teléfono</label>
          <input
            v-model="form.phone"
            type="tel"
            class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-transparent transition"
            placeholder="+1234567890"
          />
          <p v-if="errors.phone" class="text-amber-300 text-sm mt-2">
            {{ errors.phone }}
          </p>
        </div>

        <div>
          <label class="block text-sm font-medium text-white/80 mb-1">Mensaje</label>
          <textarea
            v-model="form.message"
            rows="3"
            class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-transparent transition"
            placeholder="Cuéntanos sobre tu viaje ideal"
          ></textarea>
          <p v-if="errors.message" class="text-amber-300 text-sm mt-2">{{ errors.message }}</p>
        </div>

        <div
          class="w-full px-4 py-3 bg-white/10 border border-emerald-400/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition"
        >
          <label class="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              required
              class="w-5 h-5 accent-emerald-400 border border-emerald-400 rounded transition duration-200"
            />
            <span class="text-sm">
              Acepto los
              <a
                href="#"
                @click="showModal = true"
                class="underline text-emerald-300 hover:text-emerald-400 transition"
              >
                Términos y Condiciones
              </a>
            </span>
          </label>
        </div>

        <!--Recaptcha-->
        <div class="g-recaptcha" data-sitekey="6LcUZmsrAAAAAED4P8m9xlzAJ7Z7G-TRlqy16rc4"></div>

        <button
          type="submit"
          class="w-full mt-4 bg-gradient-to-r from-emerald-400 to-emerald-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-emerald-500 hover:to-emerald-700 transition-all shadow-lg hover:shadow-emerald-500/20"
        >
          Enviar mensaje
          <svg class="w-4 h-4 inline ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg>
        </button>
      </form>
    </div>
  </div>

  <div
    v-if="showModal"
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    @click.self="showModal = false"
  >
    <div class="bg-white rounded-lg max-w-md w-full p-6 text-black">
      <h2 class="text-xl font-bold mb-4">Términos y Condiciones</h2>
      <p class="text-sm mb-4">
        Al aceptar, usted reconoce haber leído y comprendido las reglas de uso del servicio.
      </p>
      <button
        @click="showModal = false"
        class="mt-2 px-4 py-2 bg-emerald-400 text-white rounded hover:bg-emerald-500 transition"
      >
        Cerrar
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useContactStore } from '@/stores/contactStore'
import * as yup from 'yup'

// Validaciones y sanitización
const contactSchema = yup.object({
  name: yup
    .string()
    .required('El nombre es obligatorio')
    .transform((val: string) => val.trim())
    .min(3, 'Mínimo 3 caracteres'),
  email: yup
    .string()
    .required('El correo es obligatorio')
    .email('Correo inválido')
    .transform((val: string) => val.trim().toLowerCase()),
  phone: yup
    .string()
    .required('El teléfono es obligatorio')
    .transform((val: string) => val.replace(/\D/g, ''))
    .matches(/^[0-9]{7,15}$/, 'El teléfono debe tener entre 7 y 15 dígitos'),
  message: yup
    .string()
    .required('El mensaje es obligatorio')
    .transform((val: string) => val.trim())
    .min(10, 'Mínimo 10 caracteres'),
})

const contactStore = useContactStore()

const form = reactive({
  name: '',
  email: '',
  phone: '',
  message: '',
})

const errors = reactive({
  name: '',
  email: '',
  phone: '',
  message: '',
})

const showModal = ref(false)

declare const grecaptcha: any

const handleSubmit = async () => {
  try {
    // Validar con Yup
    await contactSchema.validate(form, { abortEarly: false })
    Object.keys(errors).forEach((key) => (errors[key as keyof typeof errors] = '')) // Limpiar errores

    // Validar reCAPTCHA
    const recaptchaToken = (window as any).grecaptcha.getResponse()
    if (!recaptchaToken) {
      alert('Por favor verifica que no eres un robot.')
      return
    }

    // Enviar
    await contactStore.addContact({ ...form, token: recaptchaToken })

    if (!contactStore.error) {
      alert('Mensaje enviado con éxito.')
      Object.assign(form, { name: '', email: '', phone: '', message: '' })
      grecaptcha.reset()
    } else {
      alert(contactStore.error)
    }
  } catch (err: any) {
    if (err.name === 'ValidationError') {
      err.inner.forEach((e: any) => {
        errors[e.path as keyof typeof errors] = e.message
      })
    }
  }
}
</script>
