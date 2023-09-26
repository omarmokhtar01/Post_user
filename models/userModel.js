const  mongoose = require("mongoose");
const bcrypt = require('bcryptjs')
const userSchema=new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
        },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    phone: {
        type: String,
        required: [true, "Phone is required"]
    },


},{
    timestamps: true,
    toJSON: { virtuals: true},
    toObject: {virtuals: true},
})
    userSchema.virtual('posts', {
        ref: 'Post',
        localField: '_id',
        foreignField: 'userId'
    })
userSchema.pre('save', async function(next) {
    this.password =await bcrypt.hash(this.password, 10);
    next();
    });

    
module.exports = mongoose.model('User',userSchema)