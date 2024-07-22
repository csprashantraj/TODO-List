const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const methodOverride = require('method-override');
const port = 3000;
const User = require("./models/user.js");
const List = require("./models/list.js");

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static(path.join(__dirname, "/src")));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));

dotenv.config();

main()
    .then(() => {
        console.log("connection successful");
    })
    .catch(err => console.log(err))

async function main() {
    await mongoose.connect(process.env.MONGO_URI);
}

// Landing Route
app.get("/", (req, res) => {
    res.redirect('/login');
});

// 
app.get("/:id/home", async (req, res) => {
    let { id } = req.params;
    let data = await User.find({_id : id});
    data = await List.find({username: data[0]['username']});
    console.log(data);
    res.render("home.ejs", {data: data[0], id});
});


// Login Page Route
app.get("/login", (req, res) => {
    res.render("login.ejs");
});

// Read Route
app.post("/login", async (req, res) => {
    let {username, password} = req.body;
    let data1 = await User.find({username, password});
    console.log(data1);
    let uname = data1[0]['username'];
    let data2 = await List.find({username: uname});
    res.redirect(`/${data1[0]['_id']}/home`);
});

// Create Route
app.get("/register", (req, res) => {
    res.render("register.ejs");
});

app.post("/register", async (req, res) => {
    let {email, username, password, key} = req.body;
    console.log(`email is ${email} username is ${username} password is encrypted`);
    const existingEmail = await User.find({email: `"${email}"`});
    const existingUsername = await User.find({username : `"${username}"`});

    console.log(existingEmail);
    if(existingEmail.length == 1) {
        return res.json("email");
    }
    if(existingUsername.length == 1) {
        return res.json("username");
    }

    const newUser = new User({email, username, password, securityKey: key});
    await newUser.save();

    const newList = new List({username, list: []});
    await newList.save();

    return res.json("success");
});

app.post("/:id/add", async (req, res) => {
    let {id} = req.params;
    let {item} = req.body;
    let data1 = await User.findById(id);
    let data2 = await List.find({username: data1['username']});
    let nlist = data2[0]['list'];
    nlist.push(item);
    await List.findOneAndUpdate({username: data1['username']}, {list: nlist});
    res.send("success");
});

app.post("/:id/edit", async (req, res) => {
    const { id } = req.params;
    const { index, item } = req.body;

    const user = await User.findById(id);
    const list = await List.findOne({username: user['username']});

    list['list'][index] = item;

    await list.save();
    res.send("success");
});

// Destroy Route
app.post("/:id/delete", async (req, res) => {
    const { id } = req.params;
    const { index, securityKey } = req.body;
    
    const user = await User.findById(id);
    if (user.securityKey !== parseInt(securityKey, 10)) {
        return res.send("Incorrect security key");
    }

    const list = await List.findOne({ username: user.username });
    list.list.splice(index, 1);
    await list.save();

    list.save();
    res.send("success");
})

app.listen(port, (req, res) => {
    console.log(`Listening on port:${port}`);
});