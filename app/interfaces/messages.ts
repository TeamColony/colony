export type Message = {
    name: string
    unread: number
}

let userMessages: Array<Message> = [
    {
        name: "James McDaniel",
        unread: 1,
    },
    {
        name: "Clide Calzone",
        unread: 0,
    },
]

export default userMessages;