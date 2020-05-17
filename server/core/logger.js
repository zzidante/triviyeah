const logger = function(level, console, message) {
    const methods = ['log', 'error', 'warn']
  
    if (!methods.includes(level)) {
      throw `No log level for ${level} exists`
    }
  
    console[level](message);
  };
  
  /* istanbul ignore next */
  module.exports = ({ level = 'log', _console = console, message }) => {
    return logger(level, _console, message);
  }
  