const mongoose = require('mongoose')

const postSchecma= new mongoose.Schema({
    title:{
        type:String,
        required:true
        },
        content:{
            type:String,
            required:true
        },
        userId:{
            type:mongoose.Schema.ObjectId,
            ref:'User'
        }
},{
    timestamps:true
})

module.exports  = mongoose.model('Post',postSchecma)