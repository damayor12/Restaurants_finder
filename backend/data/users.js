const bcrypt = require('bcryptjs');

module.exports = [
  {
    name: 'The Admin',
    email: 'admin@yahoo.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Busayo',
    email: 'busayo@yahoo.com',
    password: bcrypt.hashSync('12345', 10),
  },

  {
    name: 'Mike',
    email: 'mike@yahoo.com',
    password: bcrypt.hashSync('12345', 10),
  },
];
