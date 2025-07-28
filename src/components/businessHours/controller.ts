import { Request, Response } from 'express';
import { createBusinessHoursAdapter, getBusinessHoursByUserAdapter } from './adapter';

// export const createBusinessHoursController = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { user_id, hours } = req.body;

//     if (!user_id || !Array.isArray(hours)) {
//       res.status(400).json({ message: 'Datos inválidos' });
//       return;
//     }

//     const { data, error } = await createBusinessHoursAdapter(user_id, hours);

//     if (error) {
//       console.error('❌ Error al guardar horarios:', error);
//       res.status(500).json({ message: 'Error al guardar horarios' });
//       return;
//     }

//     res.status(201).json({ message: 'Horarios guardados correctamente', data });
//   } catch (err) {
//     console.error('❌ Error inesperado:', err);
//     res.status(500).json({ message: 'Error del servidor' });
//   }
// };

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
      res.status(500).json({ message: 'Error al guardar horarios', error: error.message });
      return;
    }

    res.status(201).json({
      message: `Horarios guardados correctamente para el usuario ${user_id}`,
      registros: data?.length || 0,
      data
    });
  } catch (err) {
    console.error('❌ Error inesperado:', err);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

export const getBusinessHoursByUserController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;

    if (!userId) {
      res.status(400).json({ message: 'Falta userId en los parámetros' });
      return;
    }

    const { data, error } = await getBusinessHoursByUserAdapter(userId);

    if (error) {
      res.status(500).json({ message: 'Error obteniendo horarios', error });
      return;
    }

    res.status(200).json({ businessHours: data });
  } catch (err) {
    console.error('❌ Error inesperado:', err);
    res.status(500).json({ message: 'Error del servidor' });
  }
};
