import { Request, Response } from 'express';
import { createCategoryAdapter, getAllCategorieByUserAdapter, updateCategoryAdapter, deleteCategoryAdapter } from './adapter';

export const createCategoryController = async (req: Request, res: Response): Promise<void> => {
  const { name, image_url, user_id } = req.body;

  if (!name || !user_id) {
    res.status(400).json({ error: 'Faltan campos obligatorios (name, user_id)' });
    return;
  }

  try {
    const { data, error } = await createCategoryAdapter({ name, image_url, user_id });

    if (error) {
      console.error('❌ Error al crear categoría:', error);
      res.status(500).json({ error: 'Error al crear categoría' });
      return;
    }

    res.status(201).json({ category: data });
  } catch (err) {
    console.error('❌ Error inesperado:', err);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

export const getAllCategorieByUserController = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  if (!userId) {
     res.status(400).json({ message: 'Missing userId in parameters' });
     return
  }

  const { data, error } = await getAllCategorieByUserAdapter(userId);

  if (error) {
     res.status(500).json({ message: 'Error fetching categories', error });
     return
  }

  res.status(200).json({ categories: data });
};

export const updateCategoryController = async (req: Request, res: Response): Promise<void> => {

  const { id } = req.params;
  const { name, image_url } = req.body;

  if (!id) {
    res.status(400).json({ error: 'ID de categoría requerido' });
    return;
  }

  const { data, error } = await updateCategoryAdapter({ id, name, image_url });

  if (error) {
    res.status(500).json({ error: 'Error al actualizar la categoría', message: error });
    return;
  }

  res.status(200).json({ updated: data });
};

export const deleteCategoryController = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ error: 'El ID de la categoría es requerido' });
    return;
  }

  const { data, error } = await deleteCategoryAdapter(id);

  if (error) {
    console.error('❌ Error al eliminar categoría:', error);
    res.status(500).json({ error: 'Error al eliminar la categoría', message: error });
    return;
  }

  res.status(200).json({ message: 'Categoría eliminada con éxito', deleted: data });
};
