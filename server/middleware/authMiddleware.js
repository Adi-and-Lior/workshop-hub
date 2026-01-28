import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  const token = authHeader && authHeader.startsWith('Bearer ') 
    ? authHeader.split(' ')[1] 
    : null;

  if (!token) {
    return res.status(401).json({ 
      message: "גישה נדחתה. לא נמצא טוקן אבטחה, אנא התחבר למערכת." 
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (err) {
    console.error("JWT Verification Error:", err.message);
    res.status(401).json({ 
      message: "טוקן לא תקין או פג תוקף. אנא התחבר מחדש." 
    });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: "גישה נדחתה: נדרשות הרשאות מנהל" });
  }
};