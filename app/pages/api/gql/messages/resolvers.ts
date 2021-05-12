import {Messages, Users} from '../../mongodb/schemas'
import {Types} from 'mongoose'

export default {
    Query: {
        findFirstMessage(_: any, {id}: any) {
            return Messages.findOne({users:{$in:[Types.ObjectId(id)]}}).then(data => {
                data!.users = data!.users.filter((item:any) => id != item);
                return data;
            });
        }, 

        findChatInfo(_: any, {id}: any){
            return Messages.findOne({_id: id}).then(data => {
                return data!;
            })
        },
    },


    messages: {
        users(parent: any){
            return Users.find({_id: parent.users}).then(data => data);
        }
    },
}