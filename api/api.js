import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { logger, notFound, errorHandler, startup } from './middleware';
import routes from './routes';

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
app.use('/api', routes);

// Tooling
app.use(notFound());
app.use(logger(app));
app.use(errorHandler());

app.listen(process.env.APIPORT, startup);
