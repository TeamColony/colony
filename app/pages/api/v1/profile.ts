import type { NextApiRequest, NextApiResponse } from 'next'

const sqlite3 = require('sqlite3').verbose();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
  //this is a nice and quick implementation should serve quite nicely for what we need.

    const db = await new sqlite3.Database('./mydb.sqlite', sqlite3.OPEN_READONLY,(err: Error) => {
      console.log(err)
    })
    db.serialize(() => {
      db.each('SELECT * from Users', (err: Error, data: any) => {
          if (err) {
            console.log(err)
          } else {
            console.log(data)
          }
      })
    })
    res.status(200).json({ name: 'John Doe' })
}
  