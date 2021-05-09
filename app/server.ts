import express, { Request, Response } from "express";
import next from "next";
import {ApolloServer, gql} from 'apollo-server';
import { connect } from 'mongoose';
import {merge} from 'lodash';
import path from 'path';
import {readFileSync } from 'fs'
import { Server, Socket } from "socket.io";

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
        findOneMessage(id: String): users,
        findUserMessages(id: String): users,
        findUserByID(id: String): users,
        findOneJob(name: String): jobs
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

        /*

        const http = server.listen(5000, () => 
        console.log("Socket.io endpoint: http://localhost:5000"))


        const io = new Server(http, {
            cors: {
                origin: "http://localhost:3000",
                methods: ["GET", "POST"]
              }
        })

        io.on('connection', (socket: any) => {
            console.log('a user connected');
            
            socket.on('disconnect', () => {
                console.log('user disconnected');
            });

            socket.on('message', ({name, message}: any) => {
                console.log(message);
                console.log(name);
                io.emit('message', {name, message})
            })

            socket.on('storeClientInfo', function (data: any) {
                console.log(data);
                var clientInfo: {[k: string]: any} = {};
                clientInfo.customId = data.customId;
                clientInfo.clientId = socket.id;
                clients.push(clientInfo);
            });

            socket.on('getPeerID', function (data: any){
                const peerID = clients.filter(
                    (item: any) => item.arrayWithvalue.indexOf('4') !== -1);

                socket.emit("peerID", peerID);
            });

            socket.on('disconnect', function (data: any) {

                for( var i=0, len=clients.length; i<len; ++i ){
                    var c = clients[i];

                    if(c.clientId == socket.id){
                        clients.splice(i,1);
                        break;
                    }
                }

            });
        }) */

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

        server.listen(port, (err?: any) => {
            if (err) throw err;
            console.log("Colony started.");
        })

    } catch (e: any) {
        console.error(e);
        process.exit(1);
    }
})();