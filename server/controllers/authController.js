import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "שם המשתמש כבר תפוס במערכת" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      username,
      password: hashedPassword
    });

    await user.save();
    res.status(201).json({ message: "המשתמש נרשם בהצלחה!" });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "שגיאת שרת בתהליך ההרשמה" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "שם משתמש או סיסמה שגויים" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "שם משתמש או סיסמה שגויים" });
    }

    const payload = { 
      userId: user._id,
      username: user.username 
    };

    const token = jwt.sign(
      payload, 
      process.env.JWT_SECRET, 
      { expiresIn: '24h' } 
    );

    res.json({
      token,
      user: { id: user._id, username: user.username }
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "שגיאת שרת בתהליך ההתחברות" });
  }
};