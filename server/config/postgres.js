const get_postgres_env = function(attributeName, processEnv, require) {
    const attributes = {
      port: processEnv.POSTGRES_PORT,
      host: processEnv.POSTGRES_HOST,
      databaseName: processEnv.POSTGRES_DATABASE,
      user: processEnv.POSTGRES_USER,
      password: processEnv.POSTGRES_PASSWORD,
    };
  
    if (attributeName == '__ALL') {
       return attributes;
    } else {
      const getAttribute = require('./get_attribute');
  
      return getAttribute({attributeName, attributes});
    }
  };
  
  /* istanbul ignore next */
  module.exports = ({attributeName, processEnv = process.env, require_ = require}) => {
    return get_postgres_env(attributeName, processEnv, require_);
  };