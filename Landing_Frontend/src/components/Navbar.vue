<template>
  <nav class="absolute top-0 right-0 z-20 p-6">
    <div class="flex items-center space-x-6">
      <template v-if="isAuth">
        <button
          @click="handleLogout"
          class="text-white hover:text-red-400 transition-colors duration-200 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-red-400 after:transition-all after:duration-300 hover:after:w-full cursor-pointer"
        >
          Cerrar sesión
        </button>
      </template>
      <template v-else>
        <router-link
          to="/login"
          class="text-white hover:text-emerald-300 transition-colors duration-200 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-emerald-300 after:transition-all after:duration-300 hover:after:w-full cursor-pointer"
        >
          Iniciar sesión
        </router-link>
      </template>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const { isAuth } = storeToRefs(authStore)

const handleLogout = () => {
  authStore.logout()
}
</script>
