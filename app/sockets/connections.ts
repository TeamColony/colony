import {Socket} from 'socket.io'
import {Messages} from '../pages/api/mongodb/schemas'
import { Types } from 'mongoose'

interface whoami {
    _id: Types.ObjectId,
    name: string,
    email: string,
    image: string,
    createdAt: string,
    updatedAt: string,
    messages: Array<Object>
}

type userExtention = Socket & {whoami?: whoami}

const canJoin = (msgID: Types.ObjectId, userID: Types.ObjectId) => {
    return Messages.countDocuments({_id: msgID, users: userID}).then((data) => {
        return data == 1 ? true : false
    }).catch(() => false)
}

export const connections = (Socket: userExtention) => {
    Socket.on('joinRoom', async (id) => {
        let valid = await canJoin(id.chat, (Socket.whoami as whoami)._id)
        if (valid) {
            Socket.join(id.chat)
            Socket.emit('joined', {"success" : true})
        } else {
            Socket.emit('joined', {"success" : false})
        }
    })

    Socket.on('send', (data) => {
        Messages.updateOne({_id: data.roomName}, {$push: {messages : { message: data.text, user: (Socket.whoami as whoami)._id, id: data.id }} }).then((status) => {
            if (status.nModified == 1) {
                Socket.emit('success', {"id" : data.id})
                Socket.to(data.roomName).emit('message', {[data.id] : {user: (Socket.whoami as whoami)._id, msg: data.text}})
            } else {
                Socket.emit('failure', {"issue" : "Failed to deliver message."})
            }
        })
    })
}