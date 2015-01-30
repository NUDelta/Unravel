/*
 A simple structure for a list of Backbone models. See http://backbonejs.org/#Collection
 */

var Backbone = require("backbone");
var TaskModel = require("../models/TaskModel");

var TaskCollection = Backbone.Collection.extend({
  model: TaskModel,
  id: "id"
});

module.exports = TaskCollection;