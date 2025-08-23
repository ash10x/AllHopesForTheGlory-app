// Imports...
import express from "express";

// Root Router
import rootRouter from "./routes/index.mjs";

const app = express();

app.use(express.json());
app.use(express.static("dist"));
app.use(rootRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running | PORT: ${PORT}`);
});
