const connectPGP = function({ require }) {
  const pgPromise = require('pg-promise')();
  const configService = require('../config/main');
  const postgresConfig = configService({serviceName: 'postgres'});

  const config = {
    host: postgresConfig.host,
    port: postgresConfig.port,
    database: postgresConfig.databaseName,
    user: postgresConfig.user,
    password: postgresConfig.password,
  };

  return pgPromise(config);
};

/* istanbul ignore next */
module.exports = (require_ = require) => {
  return connectPGP({ require: require_ });
};

// use this to see what database you're currently registering
// CLI: node /Users/dante/Documents/code/trivia_sockets/server/db/wrapper_pgp.js
// const db = connectPGP();

// db.any("SELECT current_database();")
// .then(data => {
//     console.log('DATA:', data); // print data;
// })
// .catch(error => {
//     console.log('ERROR:', error); // print the error;
// })
// .finally(db.$pool.end);
