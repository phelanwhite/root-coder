import express from "express";

const apiRouter = express();

apiRouter.get(`/products`, function (req, res, next) {
  res.json({ message: "Hello from Products API" });
});

export default apiRouter;
