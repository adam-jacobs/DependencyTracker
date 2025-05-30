import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js"
import dependencyRoutes from "./routes/dependencyRoutes.js";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
})

app.use('/api/users', userRoutes);

app.use('/api/dependencies', dependencyRoutes);

app.listen(5000, () => {
  console.log("server running on localhost:5000");
});
