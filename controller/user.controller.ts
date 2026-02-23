import type { Request, Response } from "express";
import type { userServicesClass } from "../services/user.services";
import { userSerializer } from "../serializer/user.serializer";

class userControllerClass {
    constructor ( private userService : userServicesClass ) {}

    createUser = async ( req : Request, res : Response ) => {
        const user = await this.userService.createUser(req.body);
        const data = userSerializer.serialize(user);

        return res.send(data);
    }

    getUser = async ( req : Request, res : Response ) => {
        const user = await this.userService.get(req.body.email);
        const data = userSerializer.serialize(user);

        return res.send(data);
    }

    getAllUsers = async ( req : Request, res : Response ) => {
        const users = await this.userService.getAll();
        const data = userSerializer.serializeAll(users);

        return res.send(data);
    }

    updateUser = async ( req : Request, res : Response ) => {
        const user = await this.userService.update(req.body);
        const data = userSerializer.serialize(user);

        return res.send(data);
    }

    deleteUser = async ( req : Request, res : Response ) => {
        const user = await this.userService.delete(req.body.email);
        const data = userSerializer.serialize(user);

        return res.send(data);
    }
}

export { userControllerClass }