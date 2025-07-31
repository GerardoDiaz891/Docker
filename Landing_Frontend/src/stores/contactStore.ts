import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { IContact } from '@/interfaces/IContact'
import { getContacts, createContact, updateContact, deleteContact } from '@/services/contactService'

export const useContactStore = defineStore('contact', () => {
  const contacts = ref<IContact[]>([])
  const error = ref<string | null>(null)

  const fetchContacts = async () => {
    try {
      const result = await getContacts()
      contacts.value.length = 0        
      contacts.value.push(...result)   
    } catch (err: any) {
      error.value = 'No se pudieron obtener los contactos.'
      console.error(err)
    }
  }


  const addContact = async (data: IContact) => {
    try {
      const newContact = await createContact(data)
      contacts.value.push(newContact)
    } catch (err: any) {
      error.value = 'No se pudo crear el contacto.'
      console.error(err)
    }
  }

  const updateExistingContact = async (id: number, data: IContact) => {
    try {
      await updateContact(id, data)
      const index = contacts.value.findIndex((c) => c.id === id)
      if (index !== -1) contacts.value[index] = { ...contacts.value[index], ...data }
    } catch (err: any) {
      error.value = 'No se pudo actualizar el contacto.'
      console.error(err)
    }
  }

  const removeContact = async (id: number) => {
    try {
      await deleteContact(id)
      contacts.value = contacts.value.filter((c) => c.id !== id)
    } catch (err: any) {
      error.value = 'No se pudo eliminar el contacto.'
      console.error(err)
    }
  }

  return {
    contacts,
    error,
    fetchContacts,
    addContact,
    updateExistingContact,
    removeContact,
  }
})
