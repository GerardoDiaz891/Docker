<template>
  <div
    class="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
    style="background-image: url('https://images.unsplash.com/photo-1506744038136-46273834b3fb')"
  >
    <!-- Capa de overlay con gradiente para mejor contraste y estética -->
    <div class="absolute inset-0 bg-gradient-to-br from-blue-900/70 to-emerald-900/60"></div>

    <!-- Barra de navegación superior -->
    <Navbar />

    <div
      class="relative z-10 max-w-7xl w-full px-6 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
    >
      <!-- Texto principal -->
      <div class="text-white space-y-8">
        <div>
          <span
            class="inline-block px-3 py-1 text-sm font-semibold text-emerald-100 bg-white/20 rounded-full mb-4"
          >
            ✨ Viajes exclusivos
          </span>
          <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
            Tu <span class="text-emerald-300">aventura</span> comienza aquí
          </h1>
        </div>

        <p class="text-lg md:text-xl text-gray-100 max-w-lg">
          Explora el mundo con confianza. Déjanos ayudarte a planear ese viaje inolvidable con
          atención personalizada y destinos de ensueño.
        </p>

        <div class="flex flex-wrap gap-4">
          <div class="flex items-center space-x-2">
            <svg
              class="w-5 h-5 text-emerald-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            <span class="text-gray-100">Asesoría personalizada</span>
          </div>
          <div class="flex items-center space-x-2">
            <svg
              class="w-5 h-5 text-emerald-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            <span class="text-gray-100">Los mejores destinos</span>
          </div>
        </div>
      </div>

      <!-- Formulario -->
      <Form />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Form from '@/components/Form.vue'
import Navbar from '@/components/Navbar.vue'
</script>
