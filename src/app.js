import express from "express";

const app = express();

app.use(express.json());

app.get("/check", (req, res) => {
  res.status(200).json({status: "oook"});
});

export default app;