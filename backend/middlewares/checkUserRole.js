import pkg from "jsonwebtoken";

const { verify } = pkg;

const checkUserRole = (role) => (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ detail: "Authorization required" });

  verify(token, process.env.SESSION_SECRET_KEY, (err, user) => {
    if (err || parseInt(user.role) !== role)
      return res.status(401).json({ detail: "Authorization required" });
    next();
  });
};

export { checkUserRole };
