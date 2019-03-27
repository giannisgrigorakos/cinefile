// 401 Unauthorized -> otan enas xrhsths prospathei na xrhsimopoihsei krisima arxeia alla den exei ena valid json webtoken
//403 Forbidden ->

module.exports = function (req, res, next) {
  if(!req.user.isAdmin) return res.status(403).send('Access denied.');
  
  next();
}