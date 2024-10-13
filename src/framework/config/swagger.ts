import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import * as fs from 'fs';
import * as path from 'path';

// Cargar la documentación de Swagger desde el archivo JSON
const swaggerDocument = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../docs/swagger-docs.v1.json'), 'utf-8')
);

// Función para configurar Swagger
export const setupSwagger = (app: Express) => {
  app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
