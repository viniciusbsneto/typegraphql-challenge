import 'dotenv/config';
import 'reflect-metadata';
import './database/connection';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server';
import RecipeResolver from './graphql/modules/recipes/resolver';

async function bootstrap() {

  const schema = await buildSchema({
    resolvers: [RecipeResolver],
  });

  const server = new ApolloServer({ schema });

  server.listen({ port: 4100 }, () => console.log('Server started at port 4100.'));
}

bootstrap();