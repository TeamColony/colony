import {Messages, Users} from '../../mongodb/schemas'
import {Types} from 'mongoose'

export default {
    Query: {
        findAllMessages() {
            return Messages.find({}).then(data => console.log(data))
        },
        findMessagesByUser(_: any, {id}: any){
            return Messages.findOne({"owner": id}).then(data => data)
        },

        findFirstMessage(_: any, {id}: any) {
            return Messages.find({users:{$in:[Types.ObjectId(id)]}}).then(data => {
                data!.length = 1;
                data[0].users = data[0].users.filter((item:any) => id != item);
                return data;
            });
        }, 

        findOneMessage(_: any, {id}: any){
            return Messages.findOne({"owner": id}).then(data => {
                data!.messages.length = 1;
                return data;
            })
        },

        findAllChatMessages(_: any, {id}: any) {
            return Messages.findOne({_id: id}).then(data => {
                if (data) {
                    // return [
                    //     {
                    //         message: "test",
                    //         user: Types.ObjectId("609115bfef8edaab341c4cc9").toString()
                    //     }
                    // ]
                    return data.messages
                }
            })
        }
    },

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