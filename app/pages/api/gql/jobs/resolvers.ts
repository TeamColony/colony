import {Jobs, Users} from '../../mongodb/schemas'
import {Types} from 'mongoose'

export default {
    Query: {
        findAllJobs() {
            return Jobs.find({}).then(data => data)
        },

        findOneJob(_: any, {name}: any) {
            return Jobs.findOne({name: name}).then(data => data)
        },

        findUserJobs(_: any, {id}: any) {
            return Jobs.find({workers: {$elemMatch: {user:Types.ObjectId(id)}}})
        },

        findQuickJobs(_: any, {id}: any) {
             return Jobs.aggregate([{ $project: {
                    image: 1,
                    name: 1,
                    workers: {$filter: {
                        input: '$workers',
                        as: 'item',
                        cond: {$not: {$eq: ['$$item.user', Types.ObjectId(id)]}}
                    }}
                }}
            ])
        },

        findNewJobs(_: any, {id}: any) {    
            return Jobs.find({"workers" : { "$not" : {"$elemMatch" : {"user" : Types.ObjectId(id)}}}});
        },
    },

    Mutation: {
        addJob(_: any, {input}: any) {
            console.log(input);

            return Jobs.updateOne(
                { _id: Types.ObjectId(input.id) },
                { $push: {
                    workers: {
                        user: Types.ObjectId(input.user),
                        price: input.price,
                        type: 0
                    }
                } 
            }).then((data) => {
                if(data.nModified = 1){
                    return true;
                } else{
                    return false;
                }
            });
        },
        removeJob(_: any, {input}: any){
            return Jobs.updateOne(
                { '_id': Types.ObjectId(input.id) }, 
                { $pull: { workers: { user: input.user } } },
                { multi: true }
            ).then((data) => {
                if(data.nModified = 1){
                    return true;
                } else{
                    return false;
                }
            });
        }
    },

    jobUser:{
        user(parent: any){
                return Users.find({_id: parent.user}).then(data => data);
        }
    }
}