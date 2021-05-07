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

export const Jobs: Model<IJobs> = models['jobs'] || model('jobs', jobSchema);


