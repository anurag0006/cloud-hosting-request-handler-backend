import express from "express";

const app = express();

app.get("/*", (req, res) => {
  const host = req.hostname;
  console.log(host);
  const id = host.split(".")[0];
  console.log(id);
});

app.listen(5000, () => {
  console.log("Server is up and running on port 5000");
});
