import express, { Request, Response } from "express";
import next from "next";
import {ApolloServer, gql} from 'apollo-server';
import { connect } from 'mongoose';
import {merge} from 'lodash';
import path from 'path';
import {readFileSync } from 'fs'
import { Server, Socket } from "socket.io";
import {connections} from './sockets/connections'

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = 3000;

const Query = gql`
    type Query {
        findAllJobs: [jobs],
        findJobByID(id: String): jobs
        findAllMessages: [messages],
        findMessagesByUser(id: String): messages,
        findOneMessage(id: String): messages,
        findUserByID(id: String): users,
        user(id: String): messages,
        findAllMessagesForUser(id: String): [userMessage]
    },
`

const jobTypeDef = gql(readFileSync(path.resolve('pages/api/gql/jobs/jobs.gql'), 'utf8'))
const jobResolvers = require("./pages/api/gql/jobs/resolvers.ts").default;

const messageTypeDef = gql(readFileSync(path.resolve('pages/api/gql/messages/messages.gql'), 'utf8'))
const messageResolvers = require("./pages/api/gql/messages/resolvers.ts").default;

const userTypeDef = gql(readFileSync(path.resolve('pages/api/gql/users/users.gql'), 'utf8'))
const userResolvers = require("./pages/api/gql/users/resolvers.ts").default;

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
            typeDefs: [Query, jobTypeDef, messageTypeDef, userTypeDef], 
            resolvers: merge(jobResolvers, messageResolvers, userResolvers),
            introspection: true,
            playground: true,
          });

        apolloServer.listen().then(({ url }: any) => {
            console.log(`GraphQL endpoint: ${url}graphql`);
        });

        //Everything else
          
        server.all("*", (req: Request, res: Response) => {
            return handle(req, res);
        })

        const srv = server.listen(port, (err?: any) => {
            if (err) throw err;
            console.log("Colony started.");
        })


        //ws        
        const io = new Server(srv, {
            cors: {
                origin: "http://localhost:3000",
                methods: ["GET", "POST"]
            }
        })

        io.on('connection', (socket: Socket) => {
            console.log(socket.handshake.auth)
            connections(socket)
        })

    } catch (e) {
        console.error(e);
        process.exit(1);
    }
})();