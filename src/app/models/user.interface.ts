export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  role: 'user' | 'admin';
  joinDate: string;
  lastLogin: string;
}