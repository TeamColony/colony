import {Users} from '../../mongodb/schemas'

export default {
    Query: {
        findUserByID(_: any, {id}: any){
            return Users.findOne({"_id": id}).then(data => data);
        },

        findNearWorkers() {
            return Users.find({}).then(data => data)
        },

        findUserMessages(_: any, {id}: any){
            return Users.findOne({"_id": id}).then(data => data);
        },
    },
}