export interface User {
  userId: string;
  username: string;
  email: string;
  avatar: string;
  company: string;
}

export interface LoginRes {
  user: User;
  auth_token: string;
}
