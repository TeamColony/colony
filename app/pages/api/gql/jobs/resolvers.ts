import {Jobs, Users} from '../../mongodb/schemas'

export default {
    Query: {
        findAllJobs() {
            return Jobs.find({}).then(data => data)
        },
        findJobByID(_: any, {id}: any) {
            return Jobs.findOne({_id: id}).then(data => data)
        },
        findOneJob(_: any, {name}: any) {
            return Jobs.findOne({name: name}).then(data => data)
        }
    },

    jobs:{
        workers(parent: any){
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