import morgan from 'morgan';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

import { swaggerOptions } from './docs/swaggerOptions';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

import userRoutes from './components/users/route';
import personalDataRoutes from './components/personalData/route';
import businessHoursRoutes from './components/businessHours/route';
import AdditionalInformation from './components/additionalInformation/route';
import geoLocationRoute from './components/geoLocation/route';
import categorieRoute from './components/categorie/route';


const app = express();
const PORT = 3000;

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
  

app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);
app.use('/api/personalData', personalDataRoutes);
app.use('/api/businessHours', businessHoursRoutes);
app.use('/api/additionalInformation', AdditionalInformation);
app.use('/api/geoLocation', geoLocationRoute);
app.use('/api/categories', categorieRoute);


app.get('/', (req: Request, res: Response) => {
  res.send('¡Hola mundo desde Express!');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
