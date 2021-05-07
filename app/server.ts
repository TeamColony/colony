import express, { Request, Response } from "express";
import next from "next";
import {ApolloServer, gql} from 'apollo-server';
import { connect } from 'mongoose';
import {merge} from 'lodash';
import path from 'path';
import {readFileSync } from 'fs'

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = 3000;

const Query = gql`
    type Query {
        findAllJobs: [jobs],
        findJobByID(id: String): jobs
    },
`

const jobTypeDef = gql(readFileSync(path.resolve('pages/api/gql/jobs/jobs.gql'), 'utf8'))
const jobResolvers = require("./pages/api/gql/jobs/resolvers.ts").default;

(async () => {
    try {
        await app.prepare();
        const server = express();

        connect('mongodb://localhost:27017/', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: 'colony',
        });

        const apolloServer = new ApolloServer({
            typeDefs: [Query, jobTypeDef], 
            resolvers: merge(jobResolvers),
            introspection: true,
            playground: true,
          });

        apolloServer.listen().then(({ url }: any) => {
            console.log(`GraphQL endpoint: ${url}graphql`);
        });
          
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