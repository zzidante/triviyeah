const handleWhenError = function(fileResponse, logger) {
  const error = fileResponse.error;

  if (error) {
    logger(error);
    throw 'QueryFile reading error'
  } else {
    return fileResponse;
  }
};

const logger = require('../core/logger');

module.exports = ({ fileResponse, _logger = logger }) => {
  return handleWhenError(fileResponse, _logger);
}
