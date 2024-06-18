const mongoose = require("mongoose");
const User = require("./models/user.js");
const List = require("./models/list.js");

main()
    .then(() => {
        console.log("connection successful");
    })
    .catch(err => console.log(err))

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/listing');
}

const user1 = new User({
    username: "prashantraj",
    password: "prashant1",
    email: "prashantraj@gmail.com",
    securityKey: 565930,
});

user1.save();

const list1 = new List({
    username: "prashantraj",
    list: ["Do Coding", "Learn Web Dev for 2 hours"],
})

list1.save();