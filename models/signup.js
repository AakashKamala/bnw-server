const mongoose = require('mongoose');
const jwt=require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        house: {
            type: String,
            required: true
        },
        locality: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        pincode: {
            type: String,
            required: true
        }
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true
    },
    email:{
        type:String,
        unique:false
    },
    mobile: String
});

userSchema.methods.generateToken =async function()
{
    try {
        return jwt.sign({
            userId:this._id.toString(),
            email:this.email,
            isAdmin:this.isAdmin,
        },
        process.env.JWT_SECRET_KEY||"WORLD",
        {
            expiresIn:"30d",
        }
        )
    } catch (error) {
        console.error(error);
    }
};

module.exports = mongoose.model('User', userSchema);
