const subject = require(`${__MR}/config/postgres`);

describe('Config/Postgres', function() {
  it('should return an attribute', function() {

    const stubGetAttribute = sinon.stub();
    const stubRequire = sinon.stub();

    const configObj = {
      POSTGRES_PORT: 'testport',
      POSTGRES_HOST: 'testhost',
      POSTGRES_DATABASE: 'testdatabase',
      POSTGRES_USER: 'testuser',
      POSTGRES_PASSWORD: ' ',
    };

    const attributes = {
      port: configObj.POSTGRES_PORT,
      host: configObj.POSTGRES_HOST,
      databaseName: configObj.POSTGRES_DATABASE,
      user: configObj.POSTGRES_USER,
      password: configObj.POSTGRES_PASSWORD,
    };

    // stub returns
    stubGetAttribute.returns('TESTATTRIBUTE');
    stubRequire.returns(stubGetAttribute);

    attributeName = 'port';

    // call
    x = subject({
      attributeName,
      processEnv: configObj,
      require_: stubRequire,
    });

    assert(x === 'TESTATTRIBUTE');
    sinon.assert.calledOnce(stubRequire);
    sinon.assert.calledOnce(stubGetAttribute);
    assert(stubRequire.getCall(0).calledWith('./get_attribute'));
    assert(stubGetAttribute.getCall(0).calledWith({attributeName, attributes}));
  });

  it('should return all attributes', function() {
    const stubGetAttribute = sinon.stub();
    const stubRequire = sinon.stub();

    const configObj = {
      POSTGRES_PORT: 'testport',
      POSTGRES_HOST: 'testhost',
      POSTGRES_DATABASE: 'testdatabase',
      POSTGRES_USER: 'testuser',
      POSTGRES_PASSWORD: 'testpassword',
    };

    const attributes = {
      port: configObj.POSTGRES_PORT,
      host: configObj.POSTGRES_HOST,
      databaseName: configObj.POSTGRES_DATABASE,
      user: configObj.POSTGRES_USER,
      password: configObj.POSTGRES_PASSWORD,
    };

    attributeName = '__ALL';

    // call
    x = subject({
      attributeName,
      processEnv: configObj,
      require_: stubRequire,
    });

    assert.deepEqual(x, attributes);
    sinon.assert.callCount(stubRequire, 0);
    sinon.assert.callCount(stubGetAttribute, 0);
  });
});
