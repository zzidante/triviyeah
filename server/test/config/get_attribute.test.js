const subject = require(`${__MR}/config/get_attribute`);

describe('Config/PostgresInternals/GetAttribute', function() {
  it('should return an attribute', function() {
    const stubLog = sinon.stub();
    const fakeConsole = { log: stubLog };
    const attribute = 'testing';
    const attributes = { testing: '123', sample: '456' };

    // call
    x = subject({
      attributeName: attribute,
      attributes: attributes,
      console: fakeConsole
    });

    assert(x === '123');
    sinon.assert.callCount(stubLog, 0);
  });

  it('should indicate attribute does not exist', function() {
    const stubLog = sinon.stub();
    const fakeConsole = { log: stubLog };
    const attribute = 'notexists';
    const attributes = { testing: '123', sample: '456' };

    // call
    x = subject({
      attributeName: attribute,
      attributes: attributes,
      console_: fakeConsole
    });

    assert(x === undefined);
    sinon.assert.callCount(stubLog, 1);
    sinon.assert.calledWith(stubLog, 'attribute "notexists" does not exist');
  });
});
