import {Users} from '../../mongodb/schemas'
import {Types} from 'mongoose'

export default {
    Query: {
        findUserByID(_: any, {id}: any){
            return Users.findOne({"_id": id}).then(data => data);
        },

        findNearWorkers(_: any, {id}: any) {
            return Users.aggregate([
                { $match: { "_id": { $ne: Types.ObjectId(id)}}},

                {
                  $lookup:
                  {
                    from: "jobs",
                    let: {user: "$_id"},

                    pipeline: [
                        {$match : { $expr : { $in: ["$$user", "$workers.user"]}}},
                    ],

                    as: "jobdata"
                  }
               },
               {
                $project: {
                    name: 1,
                    image: 1,
                    rating: 1,
                    jobs: "$jobdata",
                }
            }
            ]).then(data => data);
        },

        findUserMessages(_: any, {id}: any){
            return Users.findOne({"_id": id}).then(data => data);
        },
    },
}