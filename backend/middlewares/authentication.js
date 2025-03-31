import pkg from "jsonwebtoken";

const { verify } = pkg;

function authenticate(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.sendStatus(401);

  verify(token, process.env.SESSION_SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(401);
    req.userId = user.id;
    req.userRole = user.role;
    next();
  });
}

export { authenticate };
