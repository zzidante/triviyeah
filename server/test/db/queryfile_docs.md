# Query Files
- from https://github.com/vitaly-t/pg-promise

### Use of external SQL files (via QueryFile) offers many advantages:

- Much cleaner JavaScript code, with all SQL kept in external files;
- Much easier to write large and well-formatted SQL, with many comments and whole revisions;
- Changes in external SQL can be automatically re-loaded (option debug), without restarting the app;
- Pre-formatting SQL upon loading (option params), automating two-step SQL formatting;
- Parsing and minifying SQL (options minify + compress), for early error detection and compact queries.

### Example

```
const path = require('path');

// Helper for linking to external query files:
function sql(file) {
    const fullPath = path.join(__dirname, file);
    return new pgp.QueryFile(fullPath, {minify: true});
}

// Create a QueryFile globally, once per file:
const sqlFindUser = sql('./sql/findUser.sql');

db.one(sqlFindUser, {id: 123})
    .then(user => {
        console.log(user);
    })
    .catch(error => {
        if (error instanceof pgp.errors.QueryFileError) {
            // => the error is related to our QueryFile
        }
    });
```

### File findUser.sql:

```
/*
    multi-line comments are supported
*/
SELECT name, dob -- single-line comments are supported
FROM Users
WHERE id = ${id}
```

Every query method of the library can accept type QueryFile as its query parameter. Type QueryFile never throws any error, leaving it for query methods to gracefully reject with QueryFileError.

Use of Named Parameters within external SQL files is recommended over the Index Variables, because it makes the SQL much easier to read and understand, and because it also allows Nested Named Parameters, so variables in a large and complex SQL file can be grouped in namespaces for even easier visual separation.