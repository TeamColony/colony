import {Jobs} from '../../mongodb/schemas'

export default {
    Query: {
        findAllJobs() {
            return Jobs.find({}).then(data => data)
        },
        findJobByID(_: any, {id}: any) {
            return Jobs.findOne({_id: id}).then(data => data)
        }
    },
}