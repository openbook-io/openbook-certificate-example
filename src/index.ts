import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { config } from 'node-config-ts';
import { createSchema } from "./utils/createSchema";

const main = async () => {
  const path = "/graphql";

  const schema = await createSchema();

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }: any) => ({ req }),
    introspection: true,
    playground: true
  });

  const app = Express();

  apolloServer.applyMiddleware({app, path});

  app.listen(config.port, () => {
    console.log('server started')
  })
}

main();
