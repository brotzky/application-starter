import express from '@feathersjs/express';
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio';
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

// import services from './services';
// import channels from './channels';

const app = express(feathers());
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
  .configure(express.rest())
  .configure(socketio({ path: '/ws' }))
  .use(cookies)
  // .use(auth)
  .use('/v1', routes)
  // .configure(services)
  // .configure(channels)
  // Tooling
  .use(notFound())
  .use(logger(app))
  .use(errorHandler());

app.listen(process.env.APIPORT, startup);
