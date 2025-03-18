import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js"

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/users', userRoutes);

app.listen(5000, () => {
  console.log("server running on localhost:5000");
});
