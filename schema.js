const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    id : String,
    name : String,
    batch : String,
    created_on : {
        type : Date,
        default : Date.now
    }

})

/////MODEL /////
const postModel = mongoose.model("item", postSchema)

module.exports = postModel