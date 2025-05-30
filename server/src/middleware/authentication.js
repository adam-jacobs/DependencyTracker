import bcrypt from "bcrypt";
import getUser from "../models/userModel.js";

const authenticateUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await getUser(email);
    const correctPassword = user.password_hash;

    const isMatch = await bcrypt.compare(password, correctPassword);
    
    if (correctPassword != null) {
      if (isMatch) {
          res.status(200).json({ userId: user.id});
    } else {
          res.status(401).send();
      }
    } else {
      res.status(400).send();
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

  next();
};

export default authenticateUser;
