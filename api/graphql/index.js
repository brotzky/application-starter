import { makeExecutableSchema } from 'graphql-tools';
import { mergeTypes } from 'merge-graphql-schemas';

import resolvers from './resolvers';

import query from './types/query.gql';
import userSchema from './types/user.gql';

const typeDefs = mergeTypes([userSchema, query]);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
