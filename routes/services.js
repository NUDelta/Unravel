var TaskCollection = require("../collections/TaskCollection");
var taskCollection = new TaskCollection();

module.exports = function (app) {
  app.get("/api/posts", function (req, res) {
    res.send(taskCollection.toJSON());
  });

  app.get("/api/posts/:id", function (req, res) {
    var requestedId = req.params.id;
    var taskModel = taskCollection.get({cid: requestedId});

    if (!taskModel) {
      res.status(400).send("Cannot find post id.");
    } else {
      res.send(taskModel.toJSON());
    }
  });

  app.post("/api/posts", function (req, res) {
    var postObject = req.body;
    var taskModel = taskCollection.add(postObject);
    res.send(taskModel.toJSON());
  });

  app.put("/api/posts", function (req, res) {
    var postObject = req.body;

    var taskModel = taskCollection.get({cid: postObject.id});
    taskModel.set(postObject);

    if (!taskModel) {
      res.status(400).send("Cannot update, id not found.");
    } else {
      res.send(taskModel.toJSON());
    }
  });

  app.delete("/api/posts/:id", function (req, res) {
    var requestedId = req.params.id;
    var taskModel = taskCollection.get({cid: requestedId});

    if (!taskModel) {
      res.status(400).send("Cannot update, id not found.");
    } else {
      taskCollection.remove(taskModel);
      res.status(200).send("Deleted");
    }
  });

};