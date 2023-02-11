import mongoose from "mongoose";
import bcrypt from 'bcrypt'


const useSchema = new mongoose.Schema({
    name: {
        type: String,
        trim:true,
        required: true
    },
    email: {
        type: String,
        trim:true,
        required: true
    },
    password: {
        type: String,
        trim:true,
        required: true
    },
})


const saltRound = 10
useSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, saltRound)
    }
    next()
})


const User = new mongoose.model("User", useSchema)

export default User