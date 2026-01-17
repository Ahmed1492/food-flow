import jwt from 'jsonwebtoken';
import User from "../../db/models/user.model.js";


const authMiddleware = async (req, res, next) => {
  let { token } = req.headers;
  // console.log('token ', token);

  if (!token) {
    return res.json({ success: false, message: 'you are not authorized' });
  }

  try {
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // get correct property name (id or _id)
    const userId = decoded.id;

    // attach to request
    req.userId = userId;
    next();
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: 'something went wrong', err: error.message });
  }
};


export default authMiddleware;