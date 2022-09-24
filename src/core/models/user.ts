export interface User {
  userId: string;
  username: string;
  email: string;
  avatar: string;
  birthdate: Date;
  company: string;
}

export interface LoginRes {
  user: User;
  auth_token: string;
}
