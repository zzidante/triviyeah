const getAttribute = function({attributeName, attributes, console}) {
  if (attributes.hasOwnProperty(attributeName)) {
      return attributes[attributeName];
  } else {
    console.log(`attribute \"${attributeName}\" does not exist`);
  }
};

module.exports = ({ attributeName, attributes, console_ = console }) => {
  return getAttribute({ attributeName, attributes, console: console_ });
};
