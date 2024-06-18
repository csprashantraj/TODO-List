const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
    username :{
        type: String,
        required: true,
    },
    list :{
        type: [String],
    },
});

const List = mongoose.model("List", listSchema);

module.exports = List;