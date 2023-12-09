const sqlConfig = {
  user: 'neodast_',
  password: 'pass',
  database: 'Contact',
  server: 'localhost',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    trustServerCertificate: true,
  },
};

module.exports = sqlConfig;
