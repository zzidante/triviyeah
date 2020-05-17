const getEnvService = function({ serviceName, require }) {
    const getAttribute = require('./get_attribute');
  
    const services = {
      postgres: require('./postgres')({ attributeName: '__ALL'})
    };
  
    return getAttribute({ attributeName: serviceName, attributes: services });
  };
  
  /* istanbul ignore next */
  module.exports = ({ serviceName, require_ = require }) => {
    return getEnvService({ serviceName, require: require_ });
  };
  