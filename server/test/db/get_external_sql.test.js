const subject = require(`${__MR}/db/get_external_sql`)

// This is essentially an integration test
describe('Get External SQL', function() {
  const results = subject({here: __dirname, file: '/get_external_sql_external_file.sql'});

  it('should load expected external file (formatting is not exact as formatting proper spacing is a nightmare)', async function() {
    const removeSpaces = /\n|\r|\s|\t/g

    const removeSpaceFormatting = (str) => {
        return str.toString().replace(removeSpaces, " ").trim()
    }
        
    
    // This is dumb, interpolated strings inherit their actual declared formatting
    const expected = `
QueryFile {
    file: "/Users/dante/Documents/code/trivia_sockets/server/test/db/get_external_sql_external_file.sql"
    options: {"minify":true,"debug":false}
    query: "SELECT 'testing' AS test;"
}
`
    const awaitedResult = await results;
    assert.equal(removeSpaceFormatting(awaitedResult.result), removeSpaceFormatting(expected));
    assert.equal(removeSpaceFormatting(awaitedResult.$query), "SELECT 'testing' AS test;");
  });
});
