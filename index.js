import express from "express";
import jsonserver from "json-server";
import auth from "json-server-auth";

const server = express();
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
})

const router = jsonserver.router("./data/db.json");
server.use("/api", router);
server.db = router.db;

const middlewares = jsonserver.defaults();
const rules = auth.rewriter({
  products: 444,
  featured_products: 444,
  users: 600,
});

server.use(rules);
server.use(auth);
server.use(middlewares);
server.use(router);

server.listen(3000);

