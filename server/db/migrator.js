// const listFilesFromDirectory = require('../core/list_files_from_directory');
const getSql = require('./get_external_sql');
const db = require('./wrapper_pgp')();

const getCurrentMigrations = async () => {
  let exists;

  try {
    // do we need to generate a table?
    const sql = await getSql({here: __dirname, file: '/migrator/sql/check_schema_migration_table_exists.sql'}) 
    const migrationTableExists = await db.one(sql.result);

    exists = migrationTableExists.exists;

    if (!exists) {
      console.log('It does NOT exist!')
      // await DB.one_or_none(getSql({here: __MR, file: '/migrator/sql/generate_migration_tracking_table.sql'}))
    }
  } catch(e) {
    console.log('ERROR IN getCurrentMigrations', e)
  }

  console.log('I RAN!')
  return exists;
};

/* istanbul ignore next */
 module.exports = (action) => {
   return getCurrentMigrations();
 };

// ----------------------------
// const upMigrate = () => {
// };
// const downMigrate = () => {};
// const generateMigration = () => {};
// const listAllMigrations = () => {};

// const migrator = (action) => {
//   let migrationResponse = undefined;

//   switch (action) {
//     case 'forward':
//       migrationResponse = upMigrate();
//     break;
//     case 'rollback':
//       migrationResponse = downMigrate();
//     break;
//     case 'generate':
//       migrationResponse = generateMigration();
//     break;
//     case 'listall':
//       migrationResponse = listAllMigrations();
//     break;
//     default:
//       console.log(`${action} is not a valid action.`)
//   }

//   return migrationResponse;
// };

/* istanbul ignore next */
// module.exports = (action) => {
//   return migrator(action);
// };


// generate (file with timestamp)
// up
// down 

// 1. Read migrations folder
// 2. Get migrations 
// 3. Check if migrations table exists
// 4. if no -> generate table and then #5
// 5. if yes -> check to see which migrations exist, return timestamp of only the last one. Throw an error if any don't exists before the last one.
// 7. run all files where migrations exists in order & store them in migrations table. USE DB to get TIMESTAMP to use. 



// year month day hour minute second 

// create table migrations (
//     prefix timestamptz, 
//     title varchar
    
// )

// recursivly get a list of file/directories inside of a folder
// this uses sync so it blocks the process - there are also ways
// to do this asyncronously.