const compression = require('compression');

import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import { logger, notFound, errorHandler, startup } from './middleware';

import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

import schema from './graphql';
import routes from './routes';

// Creating our express server
const app = express();
app.set('trust proxy', 1);

// Send all responses as gzip
app.use(compression());

app.use(morgan('dev'));
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    secure: true,
    cookie: { secure: true, maxAge: 60000 },
  }),
);

// Parsing
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// GraphQL
app.use('/api', bodyParser.json(), graphqlExpress({ schema }));
app.get('/graphiql', graphiqlExpress({ endpointURL: '/api' })); // if you want GraphiQL enabled

// Tooling
app.use(notFound());
app.use(logger(app));
app.use(errorHandler());

app.listen(process.env.APIPORT, startup);
