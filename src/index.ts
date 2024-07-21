import express from "express";
import { S3 } from "aws-sdk";
import env from "dotenv";

env.config();

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

const app = express();


// getting the reqeust from the user 
app.get("/*", async (req, res) => {
  const host = req.hostname;

  const id = host.split(".")[0];
  const filePath = req.path;


  // fetching content from aws
  const contents = await s3
    .getObject({
      Bucket: "cloud",
      Key: `dist/${id}${filePath}`,
    })
    .promise();

  
  const type = filePath.endsWith("html")
    ? "text/html"
    : filePath.endsWith("css")
    ? "text/css"
    : "application/javascript";
  res.set("Content-Type", type);


  // sending back the reponse to the user for the website:
  res.send(contents.Body);
});

app.listen(3001);
