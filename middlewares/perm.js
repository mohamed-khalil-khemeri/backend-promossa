module.exports = function perm(role) {
  const my_arguments = [].slice.call(arguments);;
  return function (req, res, next) {

    if (!my_arguments.includes(req.user.role)) return res.status(403).send("Access denied ! ");
    else next();
  }
}