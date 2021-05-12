import {Messages, Users} from '../../mongodb/schemas'
import {Types} from 'mongoose'

export default {
    Query: {
        findFirstMessage(_: any, {id}: any) {
            return Messages.find({users:{$in:[Types.ObjectId(id)]}}).then(data => {
                data!.length = 1;
                data[0].users = data[0].users.filter((item:any) => id != item);
                return data;
            });
        }, 

        findAllChatMessages(_: any, {id}: any) {
            return Messages.findOne({_id: id}).then(data => {
                return data!.messages
            })
        }
    },

    //todo: re-write this:

    messages: {
        messages(parent: any){
            var ids = parent.messages.map(function(i:any) {
                return i.user;
              });

            return ids;
        },
        users(parent: any){

            var ids = parent.users.map(function(i:any) {
                return i;
              });
              
            return Users.find({_id: ids}).then(data => data);
        }
    },

    message: {
        user(parent: any){
            return Users.find({_id: parent}).then(data => data);
        }
    }
}