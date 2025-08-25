// Imports...
import express from "express";

// Root Router
import rootRouter from "./routes/index.mjs";

const app = express();

app.use(express.json());
app.use(express.static(".vercel/output/static"));
app.use(rootRouter);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.sendFile(".vercel/output/static", "index.html");
});

app.listen(PORT, () => {
  console.log(`Server Running | PORT: ${PORT}`);
});
