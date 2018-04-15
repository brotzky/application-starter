import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import {
  auth,
  cookies,
  logger,
  notFound,
  errorHandler,
  startup,
  tenant,
} from './middleware';
import routes from './routes';

const app = express();
app.set('trust proxy', 1);

app
  .use(morgan('dev'))
  .use(cookieParser())
  .use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: false,
      secure: true,
      cookie: { secure: true, maxAge: 60000 },
    }),
  )
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  // API
  .use(tenant)
  .use(cookies)
  .use('/v1', routes)
  // Tooling
  .use(notFound())
  .use(logger(app))
  .use(errorHandler());

app.listen(process.env.APIPORT, startup);
