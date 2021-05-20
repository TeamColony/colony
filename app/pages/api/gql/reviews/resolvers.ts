import {Reviews, IReviews} from '../../mongodb/schemas';

export default {
    Query: {
        findReviewsForProfile(_: any, {id}: {id: string}) {
            Reviews.findOne({user: id})
        }
    },
    Mutation: {
        createReviewForWorker(_: any, {data}: {data: IReviews}) {
            return Reviews.create(data).then(status => {
                console.log(status)
                return true
            })
        }
    }
}
