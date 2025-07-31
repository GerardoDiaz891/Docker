<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-8">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-white mb-2">Contact Manager</h1>
          <p class="text-gray-400">Administra tus contactos de forma eficiente</p>
        </div>
        <div class="mt-4 md:mt-0">
          <button
            @click="handleLogout"
            class="bg-gray-800 text-white font-bold py-3 rounded-lg hover:bg-red-500 transition duration-300 w-full md:w-40 cursor-pointer"
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
          <div class="flex items-center">
            <div class="p-3 rounded-lg bg-emerald-500/10 mr-4">
              <svg
                class="w-6 h-6 text-emerald-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <div>
              <p class="text-gray-400 text-sm">Contactos totales</p>
              <p class="text-white text-2xl font-semibold">{{ contacts.length }}</p>
            </div>
          </div>
        </div>

        <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
          <div class="flex items-center">
            <div class="p-3 rounded-lg bg-blue-500/10 mr-4">
              <svg
                class="w-6 h-6 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <p class="text-gray-400 text-sm">Con email</p>
              <p class="text-white text-2xl font-semibold">
                {{ contacts.filter((c) => c.email).length }}
              </p>
            </div>
          </div>
        </div>

        <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
          <div class="flex items-center">
            <div class="p-3 rounded-lg bg-purple-500/10 mr-4">
              <svg
                class="w-6 h-6 text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <div>
              <p class="text-gray-400 text-sm">Con teléfono</p>
              <p class="text-white text-2xl font-semibold">
                {{ contacts.filter((c) => c.phone).length }}
              </p>
            </div>
          </div>
        </div>

        <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
          <div class="flex items-center">
            <div class="p-3 rounded-lg bg-amber-500/10 mr-4">
              <svg
                class="w-6 h-6 text-amber-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
            <div>
              <p class="text-gray-400 text-sm">Editados</p>
              <p class="text-white text-2xl font-semibold">0</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Table Container -->
      <div
        class="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 shadow-2xl"
      >
        <!-- Table Header -->
        <div class="px-6 py-4 border-b border-gray-700/50 flex justify-between items-center">
          <h2 class="text-lg font-semibold text-white">Lista de Contactos</h2>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-700/30 text-gray-400 text-left">
              <tr>
                <th class="px-6 py-3 font-medium">Nombre</th>
                <th class="px-6 py-3 font-medium">Correo</th>
                <th class="px-6 py-3 font-medium">Teléfono</th>
                <th class="px-6 py-3 font-medium">Mensaje</th>
                <th class="px-6 py-3 font-medium text-right">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-700/50">
              <tr
                v-for="(contact, index) in contacts"
                :key="contact.id"
                class="hover:bg-gray-700/20 transition-colors"
              >
                <td class="px-6 py-4 text-white font-medium">
                  <div class="flex items-center space-x-3">
                    <div
                      class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center text-emerald-400 font-bold"
                    >
                      {{ contact.name.charAt(0).toUpperCase() }}
                    </div>
                    <div>
                      <p>{{ contact.name }}</p>
                      <p class="text-gray-400 text-xs">ID: {{ contact.id }}</p>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 text-white">
                  <a
                    :href="`mailto:${contact.email}`"
                    class="hover:text-emerald-400 transition-colors"
                    >{{ contact.email }}</a
                  >
                </td>
                <td class="px-6 py-4 text-white">
                  <a
                    :href="`tel:${contact.phone}`"
                    class="hover:text-emerald-400 transition-colors"
                    >{{ contact.phone }}</a
                  >
                </td>
                <td class="px-6 py-4 text-white max-w-xs truncate">
                  <p class="truncate" :title="contact.message">{{ contact.message }}</p>
                </td>
                <td class="px-6 py-4 text-right">
                  <div class="flex justify-end space-x-2">
                    <button
                      @click="openEditModal(contact)"
                      class="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white transition-colors"
                      title="Editar"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button
                      @click="remove(contact.id!)"
                      class="p-2 rounded-lg bg-gray-700 hover:bg-red-600 text-gray-300 hover:text-white transition-colors"
                      title="Eliminar"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Table Footer -->
        <div
          class="px-6 py-4 border-t border-gray-700/50 flex justify-between items-center text-gray-400 text-sm"
        >
          <div>
            Mostrando <span class="text-white font-medium">1</span> a
            <span class="text-white font-medium">{{ contacts.length }}</span> de
            <span class="text-white font-medium">{{ contacts.length }}</span> resultados
          </div>
          <div class="flex space-x-2">
            <button
              class="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
              disabled
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              class="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
              disabled
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de edición -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      @click.self="closeModal"
    >
      <div
        class="bg-gray-800 rounded-xl border border-gray-700/50 w-full max-w-md overflow-hidden shadow-2xl"
      >
        <div class="px-6 py-4 border-b border-gray-700/50 flex justify-between items-center">
          <h2 class="text-xl font-bold text-white">Editar Contacto</h2>
          <button @click="closeModal" class="text-gray-400 hover:text-white">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form class="p-6 space-y-4" @submit.prevent="update">
          <div>
            <label class="block text-gray-400 text-sm mb-2">Nombre</label>
            <input
              v-model="editForm.name"
              type="text"
              placeholder="Nombre"
              class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label class="block text-gray-400 text-sm mb-2">Correo</label>
            <input
              v-model="editForm.email"
              type="email"
              placeholder="Correo"
              class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label class="block text-gray-400 text-sm mb-2">Teléfono</label>
            <input
              v-model="editForm.phone"
              type="text"
              placeholder="Teléfono"
              class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label class="block text-gray-400 text-sm mb-2">Mensaje</label>
            <textarea
              v-model="editForm.message"
              placeholder="Mensaje"
              rows="3"
              class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            ></textarea>
          </div>

          <div class="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors flex items-center space-x-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Guardar Cambios</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useContactStore } from '@/stores/contactStore'
import type { IContact } from '@/interfaces/IContact'
import { computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const contactList = computed(() => contacts.values)
const contactStore = useContactStore()
const { contacts, fetchContacts, updateExistingContact, removeContact } = contactStore

onMounted(fetchContacts)

const showModal = ref(false)
const selectedId = ref<number | null>(null)
const editForm = reactive<IContact>({
  name: '',
  email: '',
  phone: '',
  message: '',
})

const openEditModal = (contact: IContact) => {
  selectedId.value = contact.id || null
  Object.assign(editForm, contact)
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedId.value = null
}

const update = async () => {
  if (selectedId.value !== null) {
    await updateExistingContact(selectedId.value, editForm)
    await fetchContacts()
    closeModal()
  }
}

const remove = async (id: number) => {
  if (confirm('¿Estás seguro de que deseas eliminar este contacto?')) {
    await removeContact(id)
    await fetchContacts()
  }
}

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}
</script>
