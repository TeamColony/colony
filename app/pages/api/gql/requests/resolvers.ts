import {Requests, Users, Jobs} from '../../mongodb/schemas'
import {Types} from 'mongoose'

export default {
    Query: {
        findUserRequests(_: any, {id}: any){
            return Requests.find({worker: id}).then(data => {
                return data!;
            })
        },

        findOngoing(_: any, {id}: any){
            
            return Requests.find( { $and: [
                { $or: [ { user: Types.ObjectId(id) }, { worker: Types.ObjectId(id) } ] },
                { status: 1 }
            ]} ).sort({_id:-1}).limit(1).then((data) => data);

        }
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
        },

        updateStatus(_: any, {input}: any){
            
            console.log(Types.ObjectId(input.id))

            return Requests.updateOne(
                { _id : Types.ObjectId(input.id) },
                { $set: { status : input.status } }
            ).then((data) => {
                if(data.nModified = 1){
                    return true;
                } else{
                    return false;
                }
            });
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