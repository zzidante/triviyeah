const express = require('express');
const app = express();
const PORT = 3000;
const DB = require('./db/wrapper_pgp')();
const router = require('./router');

async function startServer(app, db, console, port) {
  try {
    // database
    let dbResponse = await db.one('SELECT now()');
    
    // server
    // recognize the incoming Request Object as a JSON Object
    // bodyParser was added back to Express in release 4.16.0, because people wanted it
    // bundled with Express like before. That means you don't have to use bodyParser.json()
    // ; you can use express.json() instead.
    // https://stackoverflow.com/questions/47232187/express-json-vs-bodyparser-json/47232318#47232318
    app.use(express.json( {type: "application/json"} ));

    // organize all the routes somewhere else
    router(app);

    app.listen(port, () => console.log(`App is listening on port ${port}. Startup @ ${dbResponse.now}`))

  } catch(e) {
    console.log('Something unexpected happened!', e)
  }
}

startServer(app, DB, console, PORT);
