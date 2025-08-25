// Imports...
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Root Router
import rootRouter from "./routes/index.mjs";

const app = express();

app.use(express.json());
app.use(rootRouter);
app.use(express.static(path.join(__dirname, "..", "dist")));

app.get("/*name", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running | PORT: ${PORT}`);
});
