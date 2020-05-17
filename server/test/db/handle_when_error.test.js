const subject = require(`${__MR}/db/handle_when_error`);

describe('Db/Handle When Error', function() {
  it('should log & throw an error', function() {

    const fileResponse = { error: 'ERR!'};
    const stubLogger = sinon.stub();

    // call
    try {
      x = subject({
        fileResponse: fileResponse,
        _logger: stubLogger,
      });
    } catch(e) {
      assert(e === 'QueryFile reading error')
      assert(stubLogger.getCall(0).calledWith('ERR!'));
    }
  });

  it('should return file contents', function() {
    const fileResponse = {};
    const stubLogger = sinon.stub();

    // call
    x = subject({
      fileResponse,
      _logger: stubLogger,
    });

    assert.deepEqual(x, {})
  });
});
