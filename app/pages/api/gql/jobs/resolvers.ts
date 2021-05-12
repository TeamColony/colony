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
            return Jobs.find({workers:{$in:[Types.ObjectId(id)]}}).then(data => data);
        },
    },

    jobs:{
        workers(parent: any){

            //todo: re-write this:
            var ids = parent.workers.map(function(i:any) {
                return i;
              });

            return ids;
        }
    },

    jobUser:{
        user(parent: any){
                return Users.find({_id: parent}).then(data => data);
        }
    }
}