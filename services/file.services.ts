import type { filePgRepositoryClass } from "../repository/file/file.pgrepository";
import { serverError } from "../utils/error.utils";

class fileServicesClass {
    constructor ( private fileMethods : filePgRepositoryClass ) {}

    cloudinaryResponse = async (data : any) => {
        switch(data.notification_type){
            case 'upload':
                await this.fileMethods.upload(data);
                break;
            case 'delete':
                const fileData = await this.fileMethods.delete(data);
                break;
            case 'moderation':
                if(data.moderation_type === "rejected") {
                    await this.fileMethods.failed(data);
                }
                break;
            default :
                throw new serverError(400, `Received unknown notification type : ${data.notification_type}`);
        }

        return;
    }

    uploadFile = async ( data : any ) => {
        const secretData = await this.fileMethods.generateUploadSignature(data);
        return secretData;
    }

    getFile = async (data : any) => {
        const fileData = await this.fileMethods.get(data);
        return fileData
    }

    getFiles = async ( data : any ) => {
        const filesData = await this.fileMethods.getAll(data);
        return filesData;
    }

    deleteFile = async ( data : any ) => {
        const fileData = await this.fileMethods.initateDelete(data);
        return fileData;
    }
}

export { fileServicesClass }