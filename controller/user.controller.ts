import type { Request, Response } from "express";
import type { userServicesClass } from "../services/user.services";
import { userSerializer } from "../serializer/user.serializer";

// user controller

class userControllerClass {
    constructor ( private userService : userServicesClass ) {} // service class passed in as parameter to the constructor

    // creates user, hadns over the body object from req to the service layer
    createUser = async ( req : Request, res : Response ) => { 
        const user = await this.userService.createUser(req.body);
        const data = userSerializer.serialize(user);

        return res.json({
            success : true,
            data : data
        });
    }

    // fetches single user using email, extracts the email from the req body and passes it to the service layer 
    getUser = async ( req : Request, res : Response ) => {
        const user = await this.userService.get(req.body.email);
        const data = userSerializer.serialize(user);
        return res.json({
            success : true,
            data : data
        });
    }

    // fetches all users from the db 
    getAllUsers = async ( req : Request, res : Response ) => {
        const users = await this.userService.getAll();
        const data = userSerializer.serializeAll(users);

        return res.json({
            success : true,
            data : data
        });
    }

    // updates the user based on the email
    updateUser = async ( req : Request, res : Response ) => {
        const user = await this.userService.update(req.body);
        const data = userSerializer.serialize(user);

        return res.json({
            success : true,
            data : data
        });
    }

    // deletes the user based on email
    deleteUser = async ( req : Request, res : Response ) => {
        const user = await this.userService.delete(req.body.email);
        const data = userSerializer.serialize(user);

        return res.json({
            success : true,
            data : data
        });
    }
}

export { userControllerClass }