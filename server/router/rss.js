const rss = (req, res) => {
    // https://stackoverflow.com/questions/4832357/whats-the-difference-between-text-xml-vs-application-xml-for-webservice-respons
    res.set('Content-Type', 'text/xml');
    const xml = `
      <?xml version="1.0" encoding="UTF-8"?>

      <note>
        <update>2019-12-22</update>
        <body>Testing123!</body>
      </note>
  `.trim() // we usually want to trim the ends so that no `error: Error parsing XML: XML or text declaration not at start of entity` happens

    // FFox
    // sometimes you need to do this to read the RSS: `view-source:http://localhost:3000/rss`
    res.send(xml);
  }

module.exports = rss;