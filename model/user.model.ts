import mongoose from "mongoose"

// this interface is passed in as datatype for methods
interface baseUser {
    id : string,
    name : string,
    email : string,
    phonenumber : number,
    address : string,
    createdAt : Date
}

interface baseReturnUser {
    name : string,
    email : string,
    phonenumber : string,
    address : string
}

interface mongoUser extends baseUser, mongoose.Document{};

const userModel = new mongoose.Schema<mongoUser>({
    name : { type : String, defualt : "NA" },
    email : { type : String, unique : true },
    phonenumber : { type : Number, unique : true },
    address : { type : String, default : "NA" }
})

const User = mongoose.model("User", userModel);

export type { baseUser, baseReturnUser }
export { User };