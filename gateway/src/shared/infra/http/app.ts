import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import httpProxy from 'express-http-proxy';
import swaggerUi from 'swagger-ui-express';
import 'dotenv/config';
import 'express-async-errors';

import swaggerFile from '../../../swagger.json';
import microservicesUrls from './microservicesUrls';
import errorHandler from './middlewares/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    errorHandler(err, request, response, next);
  },
);

app.get('/', (request, response) =>
  response.json({
    apiName: 'API Gateway',
    version: '1.0.0',
  }),
);

// GATEWAY MICROSERVICES CONFIGURATION

const productsMicroserviceProxy = httpProxy(microservicesUrls.PRODUCTS_API_URL);
const purchasesMicroserviceProxy = httpProxy(
  microservicesUrls.PURCHASES_API_URL,
);

app.get('/products', (request, response, next) =>
  productsMicroserviceProxy(request, response, next),
);

app.get('/purchases', (request, response, next) => {
  purchasesMicroserviceProxy(request, response, next);
});

app.get('/purchases/:purchaseId', (request, response, next) => {
  purchasesMicroserviceProxy(request, response, next);
});

export { app };
