const subject = require(`${__MR}/db/migrator`);

describe('Db/Migrator', function() {
  it('should log things', async function() {
    // call
    console.log('Before we call.....')
    const x = await subject();

    console.log('FROM TEST ANSWER')
    console.log(x)
  });
});
