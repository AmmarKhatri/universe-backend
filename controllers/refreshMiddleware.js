const jwt = require("jsonwebtoken");

async function refreshMiddleware(req, res, next) {
  // Get the token from the request header
  const token = req.headers.authorization // Bearer <token>
  // Check if token is not present
  if (!token) {
    return res.status(403).send({
        error: 1, 
        message: "A token is required for authentication" 
    });
  }

  try {
    // Verify the token
    const token = req.headers.authorization;
    console.log(token)
    const user = jwt.verify(token.split(" ")[1], process.env.JWTSECRET);
    //check if access token is used
    if (!user.refresh){
        return res.status(401).send({
            error: 1, 
            message: "Please provide a refresh token" 
        });
    }
    req.user = user;
  } catch (err) {
    // Invalid
    return res.status(401).send({ message: "Invalid Token" });
  }
  next();
}

module.exports = refreshMiddleware;
