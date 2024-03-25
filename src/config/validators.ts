import mongoose from "mongoose"






export class Validators {

    
    static isMongoID( mongoID: string ) {

        return mongoose.isValidObjectId(mongoID )

    }

}