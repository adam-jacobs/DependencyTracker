import { Router } from 'express'
import bcrypt from "bcrypt";
import { User } from "../models/User.js";

const userRoutes = Router();

userRoutes.post("/login", async (req, res) => {
  
  const { email, password } = req.body;

  try {
    
    const user = await User.findOne(email);
    
    if (!user) return res.status(400).send("Email does not exist");
    
    const correctPassword = user.password_hash;
    const isMatch = await bcrypt.compare(password, correctPassword);

    if (!isMatch) return res.status(401).send("Incorrect password");
    
    return res.status(200).json({ userId: user.id});
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

});

export default userRoutes;