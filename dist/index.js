"use strict";
// import express from "express";
const express = require("express");
const app = express();
app.get("/*", (req, res) => {
    const host = req.hostname;
    console.log(host);
    const id = host.split(".")[0];
    console.log(id);
    const filePath = req.route;
    console.log(filePath);
});
app.listen(5000, () => {
    console.log("Server is up and running on port 5000");
});
