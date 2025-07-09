import morgan from 'morgan';
import express, { Request, Response, NextFunction } from 'express';
// import cors, { CorsOptions } from 'cors';
import cors from 'cors';
import userRoutes from './components/users/route';
import personalDataRoutes from './components/personalData/route';
import businessHoursRoutes from './components/businessHours/route';
import AdditionalInformation from './components/additionalInformation/route';
import geoLocationRoute from './components/geoLocation/route';


const app = express();
const PORT = 3000;

app.use(cors());
// const allowedOrigins = [
//   'http://localhost:5173',
//   'https://w-app-pedido-frontend.vercel.app'
// ];

// const corsOptions: CorsOptions = {
//   origin: (origin, callback) => {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   credentials: true
// };

// const customCors = (req: Request, res: Response, next: NextFunction) => {
//   const allowedOrigins = [
//     'http://localhost:5173',
//     'https://w-app-pedido-frontend.vercel.app',
//   ];

//   const origin = req.headers.origin ;
//   if (origin && allowedOrigins.includes(origin)) {
//     res.setHeader('Access-Control-Allow-Origin', origin);
//   }

//   res.setHeader('Access-Control-Allow-Credentials', 'true');
//   res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
//   );

//   if (req.method === 'OPTIONS') {
//     res.status(200).end();
//     return;
//   }

//   next();
// };

// app.use(customCors);
// app.use(cors(corsOptions));

app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);
app.use('/api/personalData', personalDataRoutes);
app.use('/api/businessHours', businessHoursRoutes);
app.use('/api/additionalInformation', AdditionalInformation);
app.use('/api/geoLocation', geoLocationRoute);


app.get('/', (req: Request, res: Response) => {
  res.send('¡Hola mundo desde Express!');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
