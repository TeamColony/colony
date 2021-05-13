import express, { Request, Response } from "express";
import next from "next";
import {ApolloServer, gql} from 'apollo-server';
import { connect, Types } from 'mongoose';
import {merge} from 'lodash';
import path from 'path';
import {readFileSync } from 'fs'
import { Server, Socket } from "socket.io";
import {connections} from './sockets/connections'
import {authentication} from './sockets/auth'

const dev = true;
const app = next({ dev });
const handle = app.getRequestHandler();
const port = 3000;

const Query = gql`
    type Query {
        findAllJobs: [jobs],
        findUserMessages(id: String): users,
        findUserByID(id: String): users,
        user(id: String): messages,
        findOneJob(name: String): jobs,
        findNearWorkers: [users],
        findUserJobs(id: String): [jobs],
        findFirstMessage(id: String): messages,
        findChatInfo(id: String): messages,
        findUserRequests(id: String): [requests]
    },
    type Mutation {
        clearMessageHistory(id: String): Boolean
        leaveChat(id: String, chatid: String): Boolean
        joinChat(users: [String]): Boolean
    }
`

const jobTypeDef = gql(readFileSync(path.resolve('pages/api/gql/jobs/jobs.gql'), 'utf8'))
const jobResolvers = require("./pages/api/gql/jobs/resolvers.ts").default;

const messageTypeDef = gql(readFileSync(path.resolve('pages/api/gql/messages/messages.gql'), 'utf8'))
const messageResolvers = require("./pages/api/gql/messages/resolvers.ts").default;

const userTypeDef = gql(readFileSync(path.resolve('pages/api/gql/users/users.gql'), 'utf8'))
const userResolvers = require("./pages/api/gql/users/resolvers.ts").default;

const requestTypeDef = gql(readFileSync(path.resolve('pages/api/gql/requests/requests.gql'), 'utf8'))
const requestResolvers = require("./pages/api/gql/requests/resolvers.ts").default;

// var clients: {[k: string]: any} = [];

(async () => {
    try {
        await app.prepare();
        const server = express();

        //MongoDB, Apollo, GraphQL

        connect('mongodb://localhost:27017/', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: 'colony',
        });

        const apolloServer = new ApolloServer({
            typeDefs: [Query, jobTypeDef, messageTypeDef, userTypeDef, requestTypeDef], 
            resolvers: merge(jobResolvers, messageResolvers, userResolvers, requestResolvers),
            introspection: true,
            playground: true,
          });

        apolloServer.listen();

        //Everything else
          
        server.all("*", (req: Request, res: Response) => {
            return handle(req, res);
        })

        const srv = server.listen(port, (err?: any) => {
            if (err) throw err;
        })


        //ws        
        const io = new Server(srv, {
            cors: {
                origin: "http://localhost:3000",
                methods: ["GET", "POST"]
            }
        })

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

        io.on('connection', (socket: userExtention) => {
            connections(socket)
        })

        io.use((socket: userExtention, next) => {
            if (socket.handshake.auth.token) {
                authentication(socket.handshake.auth.token, next).then((whoami) => {
                    socket.whoami = (whoami as whoami);
                    next()
                })
            } else {
                next(new Error('Not Authorized.')) 
            }
        })

    } catch (e) {
        console.error(e);
        process.exit(1);
    }
})();