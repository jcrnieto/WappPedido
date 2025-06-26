import { Request, Response } from 'express';
import { createBusinessHoursAdapter } from './adapter';

export const createBusinessHoursController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user_id, hours } = req.body;

    if (!user_id || !Array.isArray(hours)) {
      res.status(400).json({ message: 'Datos inválidos' });
      return;
    }

    const { data, error } = await createBusinessHoursAdapter(user_id, hours);

    if (error) {
      console.error('❌ Error al guardar horarios:', error);
      res.status(500).json({ message: 'Error al guardar horarios' });
      return;
    }

    res.status(201).json({ message: 'Horarios guardados correctamente', data });
  } catch (err) {
    console.error('❌ Error inesperado:', err);
    res.status(500).json({ message: 'Error del servidor' });
  }
};