const sqlConfig = {
  user: 'sa',
  password: 'pass',
  database: 'test123',
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
