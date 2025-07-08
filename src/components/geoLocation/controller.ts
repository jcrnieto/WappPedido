import { Request, Response } from 'express';
import { geocodeAddressAdapter } from './adapter';

export const geocodeAddressController = async (req: Request, res: Response): Promise<void> => {
  const { address, city } = req.body;

  if (!address || !city) {
    res.status(400).json({ message: 'Se requiere address y city' });
    return;
  }

  try {
    const { latitude, longitude } = await geocodeAddressAdapter(address, city);
    res.status(200).json({ latitude, longitude });
  } catch (error) {
    console.error('❌ Error en geocodificación:', error);
    res.status(500).json({ message: 'Error al obtener coordenadas' });
  }
};
