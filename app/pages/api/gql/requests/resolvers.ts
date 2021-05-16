import {Requests, Users, Jobs} from '../../mongodb/schemas'

export default {
    Query: {
        findUserRequests(_: any, {id}: any){
            return Requests.find({worker: id}).then(data => {
                return data!;
            })
        },
    },

    Mutation: {
        createRequest(_: any, {input}: any) {
            return Requests.create({
                worker: input.worker,
                job: input.job,
                user: input.user,
                request: input.request,
                address: input.address,
                time: input.time,
                status: input.status
            }).then((data) => data)
        }
    },

    requests: {
        worker(parent: any){
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