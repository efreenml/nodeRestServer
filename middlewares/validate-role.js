
const isAdminRole = async (req, res, next) => {

  const { authUser } = req;

  if (authUser.role != "ADMIN_ROLE") {
    return res.status(401).json({
      msg: "El usuario no tiene los permisos necesarios"
    });
  }
  next();
}


const hasRole = (...roles) => {

  return (req, res, next) => {
    console.log("*****roles*******");
    console.log(roles);
    if (!roles.includes(req.authUser.role)) {
      return res.status(401).json({
        msg: "not authorized"
      })
    }
    next();
  }
}













module.exports = {
  isAdminRole,
  hasRole
}