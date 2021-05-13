import {Requests, Users, Jobs} from '../../mongodb/schemas'

export default {
    Query: {
        findUserRequests(_: any, {id}: any){
            return Requests.find({worker: id}).then(data => {
                return data!;
            })
        },
    },


    requests: {
        worker(parent: any){
            console.log(parent.worker);
            return Users.findOne({_id: parent.worker}).then(data => data);
        },
        job(parent: any){
            return Jobs.findOne({_id: parent.job}).then(data => data);
        },
        user(parent: any){
            return Users.findOne({_id: parent.user}).then(data => data);
        }
        
    },
}