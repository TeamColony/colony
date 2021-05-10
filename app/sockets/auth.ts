import { Sessions } from '../pages/api/mongodb/schemas'

export const authentication = (token: string, next: any) => {
    return new Promise((resolve, reject) => {
        Sessions.aggregate([
            {
                $match: {accessToken: token}
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user'
                }
            }
        ]).then((user) => {
            if (user.length > 0) {
                resolve(user[0].user[0])
            } else {
                next(new Error('Not Authorized.')) 
            }
        }).catch(() => {
            next(new Error('Server Lookup Error.'))
        })
    })
}