import {Reviews, IReviews, Users, Requests} from '../../mongodb/schemas';

interface canUser {
    id: string,
    worker: string
}

export default {
    Query: {
        findReviewsForProfile(_: any, {id}: {id: string}) {
            return Reviews.find({user: id}).limit(3).then((data) => {
                return data
            })
        },
        canUserReview(_: any, {id, worker} : canUser) {
            return Requests.countDocuments({worker: worker, user: id}).then((count: number) => count > 0 ? true : false)
        }
    },
    Mutation: {
        createReviewForWorker(_: any, {data}: {data: IReviews}) {
            return Reviews.create(data).then(status => {
                return true
            })
        }
    },
    review : {
        by(parent: any) {
            return Users.findOne({_id: parent.by}).then(data => data)
        }
    }
}
