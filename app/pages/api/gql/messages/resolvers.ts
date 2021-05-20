import {IMessages, IUsers, Messages, Users} from '../../mongodb/schemas'
import {Types} from 'mongoose'

export default {
    Query: {
        findFirstMessage(_: any, {id}: any) {
            return Messages.findOne({users:{$in:[Types.ObjectId(id)]}}).then(data => {
                data!.users = data!.users.filter((item:any) => id != item);
                return data;
            });
        }, 

        findAllMessages(_: any, {id}: any) {
            return Messages.find({users: {$in: [Types.ObjectId(id)]}}).then(data => {
                data = data.filter((item: IMessages) => {
                    item.users.splice(item.users.indexOf(id), 1)
                    return item
                })
                return data
            })
        },

        findAllPosMessages(_:any, {id}: any) {
            return Users.aggregate([
                {
                    $match: {
                        "_id" : {$ne: Types.ObjectId(id)}
                    }
                },
                {
                    $lookup: {
                        from: 'messages',
                        let: {userId: "$_id"},
                        pipeline: [
                            {$match : { "$expr" : { $in: ["$$userId", "$users"]} }},
                            {$match : { "$expr" : { $in: [Types.ObjectId(id), "$users"]} }}
                        ],
                        as: "msg"
                    }
                },
                {
                    $project: {
                        id: '$_id',
                        name: "$name",
                        image: "$image",
                        num: {$size:"$msg"}
                    }
                },
                {
                    $match: {
                        num: { $lt: 1 }
                    }
                }
            ]).then((data) => {
                return data
            })
        },

        findChatInfo(_: any, {id}: any){
            return Messages.findOne({_id: id}).then(data => {
                return data!;
            })
        },
    },

    Mutation: {
        clearMessageHistory(_: any, {id}: any) {
            return Messages.updateOne({_id: id}, {$set: {messages: []}}).then((status) => status.nModified == 1 ? true : false)
        },
        leaveChat(_: any, {id, chatid}: any) {
            return Messages.findOne({_id: chatid}).then((data) => {
                if (data) {
                    if (data.users.length - 1 == 1) {
                        return Messages.deleteOne({_id: chatid}).then((status) => { 
                            return status.deletedCount == 1 ? true : false})
                    } else {
                        return Messages.updateOne({_id: chatid}, 
                            {$pull: {users: {$in: [Types.ObjectId(id)]}}}
                        ).then((status) => {
                            return status.nModified == 1 ? true : false
                        })
                    }
                }
            })

        },
        async joinChat(_: any, {users}: any) {
            console.log(users);
            //note: index 1 - other user
            let existing = await Messages.find({users: {$all: users}})
            if (existing.length > 0) {
                return existing[0]
            } else {
                return Messages.create({
                    users: users,
                    messages: []
                }).then((data) => {
                    return data ? data : false
                })
            }
        }
    },

    messages: {
        users(parent: any){
            return Users.find({_id: parent.users}).then(data => data);
        }
    },
}