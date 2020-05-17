const Home = require('./router/home');
const RSS = require('./router/rss');

function router(app) {
  console.log('router fired!')
  app.get('/api/home', Home);
  app.get('/api/RSS', RSS);
}

/* istanbul ignore next */
module.exports = (app) => {
  return router(app);
}
