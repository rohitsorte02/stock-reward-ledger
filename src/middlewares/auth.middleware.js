import jwt from 'jsonwebtoken';

export function authenticate(req, res, next){
  const authHeader = req.headers.authorization;

  if(!authHeader || !authHeader.startsWith("Bearer ")){
    return res.status(401).json({
      success:false,
      message:"Authentication required",
    })
  }

  const token = authHeader.split(" ")[1];

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decode.userId
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success:false,
      message:"invalid or token expired"
    })
  }
}