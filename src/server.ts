require('dotenv').config();
import express from 'express';
import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import * as Sentry from '@sentry/node';
import cors from 'cors';
const port = process.env.PORT || 4000;
import logger from './utils/log/logger';

import { typeDefs, resolvers, dataSources } from './gqlModules/gqlBase';
import { startDiscordJob } from './jobs/jobs';

Sentry.init({
  dsn:
    'https://50d76930b7304c4c94d6162db957ac8b@o425237.ingest.sentry.io/5364716'
});

const schema = makeExecutableSchema({
  typeDefs,
  // @ts-ignore
  resolvers
});

const app = express();
const server = new ApolloServer({
  schema,
  dataSources,
  playground: true,
  introspection: true
});

server.applyMiddleware({ app });
app.use(cors());

startDiscordJob();

app.listen(port, () => {
  logger.info(
    `🚀Server is ready at http://localhost:${port}${server.graphqlPath}`
  );
});
