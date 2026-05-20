import { User } from '../types/ui/user.type'
export const users: User[] = [
  {
    name: 'validUser',
    username: 'TrangNT',
    password: 'Admin@123',
    expected: 'success'
  },
  {
    name: 'invalidUser',
    username: 'invalidUser',
    password: '12345678',
    expected: 'error'
  }
];