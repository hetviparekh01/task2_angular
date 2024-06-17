import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userId : {
        type : Number,
        required : [true, 'userId is required!!'],
        unique : true
    },
    username : {
        type: String,
        required: [true, 'username is required!!']
    },  
    email: {
        type: String,
        required : [true, 'email is required!!']
    },
    addresses : [{
        street:{
            type: String,
            required: [true, 'street is required!!']
        },
        city : {
            type: String,
            required :  [true, 'city is required!!']
        },
        state : {
            type : String,
            required : [true, 'state is required!!']
        },
        zipCode : {
            type: String,
            required : [true, 'zip is required!!']
        }
    }]
},{
    timestamps: true
})

export const userModel = mongoose.model('users', userSchema);