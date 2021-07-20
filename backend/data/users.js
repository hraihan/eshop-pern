import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Mahbub Alam',
    email: 'mahbub@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Rahat Khan',
    email: 'rahat@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
