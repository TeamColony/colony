import {Socket} from 'socket.io'
import {Messages} from '../pages/api/mongodb/schemas'
import mongoose from 'mongoose'

const canJoin = (msgID: string, userID: string) => {
    return Messages.findOne({_id: msgID, users: {$all: mongoose.Types.ObjectId(userID)}}).then((data) => {
        return data ? true : false
    }).catch(() => false)
}

export const connections = (Socket: Socket) => {
    Socket.on('joinRoom', async (id) => {
        let valid = await canJoin(id.chat, id.user)
        if (valid) {
            Socket.join(id.chat)
            Socket.emit('joined', {"success" : true})
        }
    })

    Socket.on('send', (data) => {
        Messages.updateOne({_id: data.roomName}, {$push: {messages : { message: data.text, user: data.user }} }).then((status) => {
            Socket.to(data.roomName).emit('message', {user: data.user, message: data.text})
        })
    })
}