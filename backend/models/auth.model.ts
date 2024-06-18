import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    userId : {
        type : Number,
        required : [true, 'userId is required!!'],
        unique : true
    },
    password : {
        type: String,
        required: [true, 'password is required!!']
    },
},{
    timestamps: true
})

export const authModel = mongoose.model('auth', authSchema);