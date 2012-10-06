
exports.index = function(req, res){
 console.log(req.loggedIn);
 res.render('index', { title: 'Express' });
};
