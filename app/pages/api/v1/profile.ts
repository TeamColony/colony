import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    mongoose.connect('mongodb://localhost:27017/colony', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    res.status(200).json({ name: 'John Doe' })
}
  