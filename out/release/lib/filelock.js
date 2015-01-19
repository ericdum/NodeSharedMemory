// Generated by CoffeeScript 1.8.0
var Filelock, fs;

fs = require('fs');

Filelock = (function() {
  function Filelock() {}

  Filelock.prototype._try = function(path, cb) {
    var e;
    try {
      return this._do(path, cb);
    } catch (_error) {
      e = _error;
      console.log(e, 'xxxxxxx');
      return this.lock(path, cb);
    }
  };

  Filelock.prototype._do = function(path, cb) {
    var _this;
    _this = this;
    return fs.open(path, 'wx', function(err, fd) {
      if (err) {
        return _this.lock(path, cb);
      } else {
        return fs.close(fd, cb);
      }
    });
  };

  Filelock.prototype.lock = function(path, cb) {
    return process.nextTick((function(_this) {
      return function() {
        return _this._try(path, cb);
      };
    })(this));
  };

  Filelock.prototype.unlock = function(path, cb) {
    return fs.unlink(path, cb);
  };

  return Filelock;

})();

module.exports = new Filelock();
