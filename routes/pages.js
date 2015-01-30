module.exports = function(app){
  var home = function(req, res){
    res.render('index', {
      title: "Title here"
    });
  };

  app.get("/", home);
  app.get("/index", home);
};

