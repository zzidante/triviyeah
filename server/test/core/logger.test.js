const subject = require(`${__MR}/core/logger`);

describe('Core/Logger', function() {
  it('should call the logger', function() {
    const stubLog = sinon.stub();
    const fakeConsole = { log: stubLog };

    // call
    x = subject({
      level: 'log',
      _console: fakeConsole,
      message: 'testing',
    });

    assert(x === undefined);
    sinon.assert.callCount(stubLog, 1);
    assert(stubLog.getCall(0).calledWith('testing'));
  });

  it('should throw an error', function() {
    const stubLog = sinon.stub();
    const fakeConsole = { log: stubLog };

    // call
    try {
      x = subject({
        level: 'TEST',
        _console: fakeConsole,
        message: 'testing',
      });
    } catch(e) {
      assert(e === 'No log level for TEST exists');
    }

    sinon.assert.callCount(stubLog, 0);
  });
});
