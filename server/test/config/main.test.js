const s = require('sinon');
const subject = require(`${__MR}/config/main`)
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

describe('Config/Main', function() {
  it('should call functions correctly', function() {
    const stubGetAttribute = sandbox.stub();
    const stubRequire = sandbox.stub();
    const stubPostgresConfig = sandbox.stub();

    // stub returns
    stubRequire.onCall(0).returns(stubGetAttribute);
    stubRequire.onCall(1).returns(stubPostgresConfig);
    stubPostgresConfig.onCall(0).returns('postgres');
    stubGetAttribute.onCall(0).returns(() => {});

    const serviceName = 'testing';
    const services = { postgres: 'postgres' };
    // call
    subject({
      serviceName: serviceName,
      require_: stubRequire,
    });

    // asserts
    s.assert.calledTwice(stubRequire);
    s.assert.calledOnce(stubGetAttribute);

    assert(stubRequire.getCall(0).calledWith('./get_attribute'));
    assert(stubRequire.getCall(1).calledWith('./postgres'));
    assert(stubPostgresConfig.getCall(0).calledWith({ attributeName: '__ALL'}));
    assert(stubGetAttribute.getCall(0).calledWith({ attributeName: serviceName, attributes: services }));
  });
});
