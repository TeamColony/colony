import {Users} from '../../mongodb/schemas'
import {Types} from 'mongoose'

export default {
    Query: {
        findUserByID(_: any, {id}: any){
            return Users.findOne({"_id": id}).then(data => data);
        },

        findNearWorkers(_: any, {id}: any) {
            return Users.aggregate([{ $match: { "_id": { $ne: Types.ObjectId(id) } }}]).then(data => data)
        },

        findUserMessages(_: any, {id}: any){
            return Users.findOne({"_id": id}).then(data => data);
        },
    },
}