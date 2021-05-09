import { Document, Model, model, models, Types, Schema } from "mongoose"

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
        type: Types.ObjectId,
        required: true
    },
})

export interface IMessages extends Document {
    id: Types.ObjectId,
    owner: Types.ObjectId,
    messages: Array<Object>,
}

const messageSchema = new Schema({
    id: {
        type: Types.ObjectId,
        required: true
    },
    users: {
        type: Array,
        required: true
    },
    messages: {
        type: Array,
        required: true
    }
})

export interface IUsers extends Document {
    id: Types.ObjectId,
    name: string,
    email: string,
    image: string,
    createdAt: string,
    updatedAt: string,
    messages: Array<Object>
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
    createdAt: {
        type: String,
        required: true
    },
    updatedAt: {
        type: String,
        required: true
    },
    messages: {
        type: Object,
        required: false
    }
})

export const Jobs: Model<IJobs> = models['jobs'] || model('jobs', jobSchema);
export const Messages: Model<IMessages> = models['messages'] || model('messages', messageSchema);
export const Users: Model<IUsers> = models['users'] || model('users', userSchema);



