const express = require("express");
const app = express();
const path = require("path");

const port = 3000;
app.use(express.static(path.join(__dirname, "/public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/home", (req, res) => {
    res.render("home.ejs");
});

app.get("/login", (req, res) => {
    res.render("login.ejs");
})


app.listen(port, (req, res) => {
    console.log(`Listening on port:${port}`);
});