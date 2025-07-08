import morgan from 'morgan';
import express, { Request, Response } from 'express';
const cors = require('cors');
import userRoutes from './components/users/route';
import personalDataRoutes from './components/personalData/route';
import businessHoursRoutes from './components/businessHours/route';
import AdditionalInformation from './components/additionalInformation/route';
import geoLocationRoute from './components/geoLocation/route';


const app = express();
const PORT = 3000;


app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use(morgan('dev'));
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
