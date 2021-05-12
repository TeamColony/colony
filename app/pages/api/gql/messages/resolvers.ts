import {Messages, Users} from '../../mongodb/schemas'

export default {
    Query: {
        findAllMessages() {
            return Messages.find({}).then(data => console.log(data))
        },
        findMessagesByUser(_: any, {id}: any){
            return Messages.findOne({"owner": id}).then(data => data)
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
    },

    message: {
        user(parent: any){
            return Users.find({_id: parent}).then(data => data);
        }
    }
}