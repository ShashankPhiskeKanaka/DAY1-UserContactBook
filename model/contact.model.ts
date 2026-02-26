import mongoose from "mongoose"

// this interface is passed in as datatype for methods
interface baseContact {
    id : string,
    name : string,
    email : string,
    phoneNumber : string,
    address : string,
    createdAt : Date,
    deletedAt : Date | null,
    ownerId? : string
}

interface pageinationData {
    contacts : baseContact[],
    nextCursor : string | undefined,
    hasMoreData : boolean
}

interface baseReturnUser {
    name : string,
    email : string,
    phonenumber : string,
    address : string
}

interface auditData {
    model : string,
    action : string,
    recordId : string,
    before? : object | null,
    after? : object | null,
    metadata? : {
        ip? : string,
    } | null
}

interface mongoUser extends baseContact, mongoose.Document{};

const userModel = new mongoose.Schema<mongoUser>({
    name : { type : String, defualt : "NA" },
    email : { type : String, unique : true },
    phoneNumber : { type : String, unique : true },
    address : { type : String, default : "NA" }
})

const User = mongoose.model("User", userModel);

export type { baseContact, baseReturnUser, pageinationData, auditData }
export { User };