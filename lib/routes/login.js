
exports.login = function(req, res){
 console.log(req.loggedIn);
 res.render('login/login', { title: 'Express' });
};
