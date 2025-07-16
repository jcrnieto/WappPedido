export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Api de aplicacion WaPedidos',
      version: '1.0.0',
      description: 'Documentación de endpoints de tu API (additional information, business hours, personal data, users)',
    },
    servers: [
      {
        url: 'http://localhost:3000/api', 
      },
    ],
  },
  apis: ['./src/components/users/route*.ts'], 
};
