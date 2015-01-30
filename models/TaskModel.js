var Backbone = require("backbone");
var _ = require("underscore");

var TaskModel = Backbone.Model.extend({
  toJSON: function (options) {
    var o = _.clone(this.attributes);
    o.id = this.cid;
    return o;
  }
});

module.exports = TaskModel;