const home = (req, res) => {
  console.log(req)
  console.log(res)
  // Write response
  // https://blog.fullstacktraining.com/res-json-vs-res-send-vs-res-end-in-express/
  res.send(`<h1>Hello World!</h1>`)
}

module.exports = home;