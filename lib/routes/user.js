
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.logout = function(req, res){
   req.logout();
   res.redirect('/');
};
