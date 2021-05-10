import userMessages from '../../../../interfaces/messages';
import {Users} from '../../mongodb/schemas'

export default {
    Query: {
        findUserByID(_: any, {id}: any){
            return Users.findOne({"_id": id}).then(data => data);
        },

        findNearWorkers() {
            return Users.find({}).then(data => data)
        },

        findOneMessage(_: any, {id}: any){
            return Users.findOne({"_id": id}).then(data => {
                data!.messages.length = 1;
                return data;
            });
        },

        findUserMessages(_: any, {id}: any){
            return Users.findOne({"_id": id}).then(data => data);
        },
    },

    users: {
        messages(parent: any){
            var ids = parent.messages.map(function(i:any) {
                return i.user;
            });

            return ids;
        },
    },

    userMessage: {
        user(parent: any){
            return Users.find({_id: parent}).then(data => data);
        }
    }

}