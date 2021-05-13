import { Document, Model, model, models, Types, Schema } from "mongoose"

export interface ISessions extends Document {
    userId: Types.ObjectId,
    expires: Date,
    sessionToken: string,
    accessToken: string,
    createdAt: Date,
    updatedAt: Date
}

const sessionSchema = new Schema({
    userId: {
        type: Types.ObjectId,
        required: true
    },
    expires: {
        type: Date,
        required: true
    },
    sessionToken: {
        type: String,
        required: true
    },
    accessToken: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        required: true
    }
})

export interface IJobs extends Document {
    id: Types.ObjectId,
    image: string,
    name: string,
    workers: Array<Types.ObjectId>,
}

const jobSchema = new Schema({
    id: {
        type: Types.ObjectId,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    workers: {
        type: Array,
        required: true
    },
})

export interface IRequests extends Document {
    id: Types.ObjectId,
    worker: Types.ObjectId,
    user: Types.ObjectId,
    job: Types.ObjectId,
    request: String,
    postcode: String,
    time: String,
    status: number
}

const requestSchema = new Schema({
    id: {
        type: Types.ObjectId,
        required: true
    },
    worker: {
        type: Types.ObjectId,
        required: true
    },
    job: {
        type: Types.ObjectId,
        required: true
    },
    user: {
        type: Types.ObjectId,
        required: true
    },
    request: {
        type: String,
        required: true
    },
    postcode: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true
    },
})

export interface IMessages extends Document {
    id: Types.ObjectId,
    users: Array<Types.ObjectId>,
    messages: Array<any>,
}

const individualMessage = new Schema({
    message: {
        type: String,
        required: true
    },
    user: {
        type: Types.ObjectId,
        required: true
    }
})

const messageSchema = new Schema({
    id: {
        type: Types.ObjectId,
        required: false
    },
    users: {
        type: [Types.ObjectId],
        required: true
    },
    messages: {
        type: [individualMessage],
        required: true
    }
})

export interface IUsers extends Document {
    id: Types.ObjectId,
    name: string,
    email: string,
    image: string,
    messages: Array<Object>,
    rating: number,
    createdAt: string,
    updatedAt: string,
}

const userSchema = new Schema({
    id: {
        type: Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    messages: {
        type: Array,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    createdAt: {
        type: String,
        required: true
    },
    updatedAt: {
        type: String,
        required: true
    },
})

export const Jobs: Model<IJobs> = models['jobs'] || model('jobs', jobSchema);
export const Messages: Model<IMessages> = models['messages'] || model('messages', messageSchema);
export const Users: Model<IUsers> = models['users'] || model('users', userSchema);
export const Sessions: Model<ISessions> = models['sessions'] || model('sessions', sessionSchema);
export const Requests: Model<IRequests> = models['requests'] || model('requests', requestSchema);


