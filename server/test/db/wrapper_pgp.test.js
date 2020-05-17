const s = require('sinon');
const subject = require(`${__MR}/db/wrapper_pgp`)
let sandbox;

// you seem to need these if you're making different test cases.
beforeEach(function () {
  // Create a sandbox for the test
  sandbox = s.createSandbox();
});

afterEach(function () {
  // Restore all the things made through the sandbox
  sandbox.restore();
});

describe('Wrapper PGP', function() {
  it('should call functions correctly', function() {
    const stubPgPromise = sandbox.stub();
    const stubPgPromiseTrigger = sandbox.stub();
    const configService = sandbox.stub();
    const stubRequire = sandbox.stub();
    const sampleConfig = {
      host: 'testhost',
      port: 'testport',
      databaseName: 'testdatabase',
      user: 'testuser',
      password: 'testpassword',
   };

    const parsedConfig = {
      host: 'testhost',
      port: 'testport',
      database: 'testdatabase',
      user: 'testuser',
      password: 'testpassword',
   };

    // stub returns
    stubPgPromise.returns(() => {});

    stubPgPromiseTrigger.returns(stubPgPromise);
    configService.returns(sampleConfig);

    stubRequire.onCall(0).returns(stubPgPromiseTrigger);
    stubRequire.onCall(1).returns(configService);

    // call
    results = subject(stubRequire);

    // asserts
    s.assert.calledTwice(stubRequire);
    assert(stubRequire.getCall(0).calledWith('pg-promise'));
    assert(stubRequire.getCall(1).calledWith('../config/main'));

    s.assert.calledWith(configService, {serviceName: 'postgres'});
    s.assert.calledOnce(stubPgPromiseTrigger);
    s.assert.calledWith(stubPgPromise, parsedConfig);
  });
});
