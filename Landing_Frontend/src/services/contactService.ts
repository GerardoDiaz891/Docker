import { genericRequest, genericRequestAuth } from '@/utils/genericRequest'

export const getContacts = async () => {
  const response = await genericRequestAuth('/contacts', 'GET')
  return response
}

export const createContact = async (data: any) => {
  const response = await genericRequest('/contacts', 'POST', data)
  return response
}

export const updateContact = async (id: number, data: any) => {
  const response = await genericRequestAuth(`/contacts/${id}`, 'PUT', data)
  return response
}

export const deleteContact = async (id: number) => {
  const response = await genericRequestAuth(`/contacts/${id}`, 'DELETE')
  return response
}
