export interface ILoginUser {
  email: string
  password: string
}

export interface IUser {
  name: string
  email: string
  role: 'admin' | 'user'
}

export interface IAuthResponse {
  token: string
  user: IUser
}
