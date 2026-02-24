import { User, type baseContact } from "../../model/contact.model";
import { contactMethodsClass } from "./contact.methods";

class userMongoRepositoryClass extends contactMethodsClass {
    create = async ( data : baseContact ) : Promise<baseContact> => {
        const user = new User(data);
        await user.save();
        return user;
    }

    getAll = async () : Promise<baseContact[]> => {
        const users = await User.find();
        return users;
    }

    get = async (email: string): Promise<baseContact> => {
        const user = await User.findOne({ email : email });
        return user ?? <baseContact>{};
    }

    update = async ( data : baseContact ) : Promise<baseContact> => {
        const user = await User.findOne({ email : data.email });

        if(user != null){
            user.address = data.address ?? user.address;
            user.name = data.name ?? user.name;
            user.phonenumber = data.phonenumber ?? user.phonenumber;
            await user.save();
        }
        return user ?? <baseContact>{};
    }

    delete = async ( email : string ) : Promise<baseContact> => {
        const user = await User.findOneAndDelete({ email : email });
        return user ?? <baseContact>{};
    }
}

export { userMongoRepositoryClass }