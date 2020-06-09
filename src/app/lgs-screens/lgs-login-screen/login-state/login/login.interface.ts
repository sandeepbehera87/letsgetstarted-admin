export interface LoginData {
  token?: string,
  success?: boolean,
  error?: string | null
}

export interface LoginUserData {
  'user-email'?: string,
  'user-password'?: string,
}
