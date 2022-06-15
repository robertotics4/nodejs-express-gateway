import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import 'dotenv/config';
import 'express-async-errors';

import swaggerFile from '../../../swagger.json';
import errorHandler from './middlewares/errorHandler';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    errorHandler(err, request, response, next);
  },
);

app.get('/', (request, response) =>
  response.json({
    apiName: 'Purchases Microservice',
    version: '1.0.0',
  }),
);

export { app };
