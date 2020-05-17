const sql = async function({ here, file }) {
    const path = require('path');
    const { QueryFile } = require('pg-promise');
    const handleWhenError = require('./handle_when_error');
    const fullPath = path.join(here, file);

    const queryIoObj =  new QueryFile(fullPath, {minify: true});

     // this is the query itself - its used to pass into the PGP API the same as a String query.
    const query = handleWhenError({ fileResponse: queryIoObj});

    return { 
        queryObject: query, 
        $query: query[QueryFile.$query]
    } ;
};

module.exports = ({ here, file }) => {
    return sql({ here, file });
}

// https://stackoverflow.com/questions/50160239/pg-promise-proper-way-of-returning-result-of-query
// https://www.keithcirkel.co.uk/metaprogramming-in-es6-symbols/


// From Docs Themselves
// // Hiding the query as a symbol within the type,
// to make it even more difficult to misuse it:

// before:
// const file$query = Symbol(`QueryFile.query`);

// actual clause from comment (Above)
// QueryFile.$query = file$query;


// query[QueryFile.$query] works because
// query at this point is a promise (which is an Object) with meta data available on the used query which is
// available via a Symbol key saved in the current state of the Object via Class.$query. 
// Holy god that's weird.