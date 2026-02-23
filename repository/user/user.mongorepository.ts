import { User, type baseUser } from "../../model/user.model.js";
import { userMethodsClass } from "./user.methods.js";

class userMongoRepositoryClass extends userMethodsClass {
    create = async ( data : baseUser ) : Promise<baseUser> => {
        const user = new User(data);
        await user.save();
        return user;
    }

    getAll = async () : Promise<baseUser[]> => {
        const users = await User.find();
        return users;
    }

    get = async (email: string): Promise<baseUser> => {
        const user = await User.findOne({ email : email });
        return user ?? <baseUser>{};
    }

    update = async ( data : baseUser ) : Promise<baseUser> => {
        const user = await User.findOne({ email : data.email });

        if(user != null){
            user.address = data.address ?? user.address;
            user.name = data.name ?? user.name;
            user.phonenumber = data.phonenumber ?? user.phonenumber;
            await user.save();
        }
        return user ?? <baseUser>{};
    }

    delete = async ( email : string ) : Promise<baseUser> => {
        const user = await User.findOneAndDelete({ email : email });
        return user ?? <baseUser>{};
    }
}

export { userMongoRepositoryClass }