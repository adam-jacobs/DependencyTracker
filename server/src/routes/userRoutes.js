import express from 'express'
import authenticateUser from '../middleware/authentication.js'

const userRoutes = express.Router();

userRoutes.post("/login", authenticateUser, () => {
});

export default userRoutes;