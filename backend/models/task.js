const mongoose = require("mongoose") ;
const taskScema = new mongoose.Schema({
    title: {
        type: String,
               required:true,
               unique: true,
    },
    desc: {
        type: String,
        required: true,
        unique: true,
    },
    important: {
        type: Boolean,
       default: false,
    },
    complited: {
        type: Boolean,
       default: false,
    },
}
//timestamps
);
module.exports = mongoose.model("task",taskScema)