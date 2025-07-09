import morgan from 'morgan';
import express, { Request, Response } from 'express';
// const cors = require('cors');
import cors, { CorsOptions } from 'cors';
import userRoutes from './components/users/route';
import personalDataRoutes from './components/personalData/route';
import businessHoursRoutes from './components/businessHours/route';
import AdditionalInformation from './components/additionalInformation/route';
import geoLocationRoute from './components/geoLocation/route';


const app = express();
const PORT = 3000;

const allowedOrigins = [
  'http://localhost:5173',
  'https://w-app-pedido-frontend.vercel.app'
];

app.use(express.json());

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
};

app.use(cors(corsOptions));

app.use(morgan('dev'));
app.use('/api/users', userRoutes);
app.use('/api/personalData', personalDataRoutes);
app.use('/api/businessHours', businessHoursRoutes);
app.use('/api/additionalInformation', AdditionalInformation);
app.use('/api/geoLocation', geoLocationRoute);


app.get('/', (req: Request, res: Response) => {
  res.send('¡Hola mundo desde Express!');
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
