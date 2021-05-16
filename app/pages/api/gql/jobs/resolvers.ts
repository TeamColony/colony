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
            return Jobs.aggregate([{ $match: { "workers": { $ne: {"user" : Types.ObjectId(id)} } }},
             { $project:{ image: 1, name:1, workers: { $slice: ["$workers", 1] }}}]).then(data => data);
        },
    },

    jobUser:{
        user(parent: any){
                return Users.find({_id: parent.user}).then(data => data);
        }
    }
}