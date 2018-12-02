import Express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as os from 'os';
import cookieParser from 'cookie-parser';
import swaggerify from './swagger';
import cors from 'cors';
import l from './logger';
import { connect as DBconnect } from './db';


const app = new Express();

export default class ExpressServer {
  constructor() {
    const root = path.normalize(`${__dirname}/../..`);
    app.set('appPath', `${root}client`);
    app.use(cors())
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser(process.env.SESSION_SECRET));
    app.use(Express.static(`${root}/public`));
  }

  router(routes) {
    swaggerify(app, routes);
    return this;
  }

  listen(port = process.env.PORT) {
    DBconnect(process.env.MONGO_URL, process.env.MONGO_DB, function(err) {
      if (err) {
        console.log('Unable to connect to Mongo.')
        process.exit(1)
      } else {
        console.log('Conected.')
        const welcome = p => () => l.info(`up and running in ${process.env.NODE_ENV || 'development'} @: ${os.hostname()} on port: ${p}}`);
        http.createServer(app).listen(port, welcome(port));
        return app;
      }
    })


  }
}
