import  {  ApolloServer, gql  }  from  "apollo-server-micro";
import { connect } from 'mongoose';
import {merge} from 'lodash';
import path from 'path';
import {readFileSync } from 'fs'

connect('mongodb://localhost:27017/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'colony',
}).then(() => console.log("connected to mongoose"))

const Query = gql`
    type Query {
        findAllJobs: [jobs],
        findJobByID(id: String): jobs
    },
`

const jobTypeDef = gql(readFileSync(path.resolve('pages/api/gql/jobs/jobs.gql'), 'utf8'))
const jobResolvers = require("./gql/jobs/resolvers.ts").default;

const apolloServer = new ApolloServer({ 
    typeDefs: [Query, jobTypeDef], 
    resolvers: merge(jobResolvers),
});

export const config = {
    api: {
        bodyParser:  false
    }
};

export  default  apolloServer.createHandler({ path:  "/api/graphql"  });