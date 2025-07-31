import { genericRequest } from '@/utils/genericRequest'
import type { ILoginUser } from '@/interfaces/IUser'

export const loginUser = async (data: ILoginUser) => {
  const response = await genericRequest('/auth/login', 'POST', data)
  return response
}
