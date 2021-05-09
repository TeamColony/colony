import {Users} from '../../mongodb/schemas'

export default {
    Query: {
        findUserByID(_: any, {id}: any){
            return Users.findOne({"id": id}).then(data => data)
        }
    },
}