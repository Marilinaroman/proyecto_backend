import mongoose from 'mongoose'

const usersCollection = 'users'

mongoose.set('strictQuery', true)

const userSchema = new mongoose.Schema({
    name:String,
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    age:{
        type: Number,
        required:true

    },
    phone:{
        type: String,
        required:true
    },
    photo:{
        type:String,
        required:true
    }
})

export const UserModel = mongoose.model(usersCollection,userSchema)