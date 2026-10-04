export type LoginParams = {
  username: string
  password: string
}

export type UserLogged = {
  id: string
  username: string
  createdAt: Date
  updatedAt: Date
}
