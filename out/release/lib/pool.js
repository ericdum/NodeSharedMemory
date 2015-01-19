// Generated by CoffeeScript 1.8.0
var Pool, pool;

Pool = (function() {
  function Pool(name, process) {
    this.name = name;
    this.process = process;
    this.acc = 0;
    this.cbs = [];
    this.updating = false;
  }

  Pool.prototype.add = function(acc, cb) {
    this.acc += acc;
    this.cbs.push(cb);
    if (!this.updating) {
      return this.update();
    }
  };

  Pool.prototype.update = function() {
    var acc, cbs;
    if (this.updating) {
      return;
    }
    if (!this.acc) {
      return;
    }
    this.updating = true;
    acc = this.acc;
    cbs = this.cbs;
    this.acc = 0;
    this.cbs = [];
    return this.process(acc, (function(_this) {
      return function() {
        var cb;
        while (cb = cbs.pop()) {
          cb();
        }
        _this.updating = false;
        return _this.update();
      };
    })(this));
  };

  return Pool;

})();

pool = {};

module.exports = function(key, acc, cb, process) {
  if (!pool[key]) {
    pool[key] = new Pool(key, process);
  }
  return pool[key].add(acc, cb);
};