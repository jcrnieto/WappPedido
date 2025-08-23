import { Request, Response } from 'express';
import { 
  createProductAdapter, 
  getAllProductByIdAdapter, 
  deleteProductAdapter, 
  getProductByCategoryIdAdapter,
  getProductsWithoutCategoryAdapter,
  updateProductAdapter,
  getProductByIdAdapter,
  getProductByNameAdapter,
  getAllProductByIdCategoryIsNullAdapter
} from './adapter';
import { CreateProductInput } from './type';

export const createProductController = async (
  req: Request<{}, {}, CreateProductInput>,
  res: Response
): Promise<void> => {
  try {
    const { name, description, price, images_url, category_id, user_id } = req.body;

    if (!name || !price || !user_id) {
      res.status(400).json({ message: 'Campos obligatorios: name, price, user_id' });
      return;
    }

    const { data, error } = await createProductAdapter({
      name,
      description,
      price,
      images_url,
      category_id: category_id || null, 
      user_id
    });

    if (error) {
      console.error('❌ Error al crear producto:', error);
      res.status(500).json({ message: 'Error al crear producto' });
      return;
    }

    res.status(201).json({ message: 'Producto creado con éxito', product: data });
  } catch (err) {
    console.error('❌ Error inesperado:', err);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

export const getAllProductByIdController = async (
  req: Request<{ userId: string }>,
  res: Response
): Promise<void> => {
  const { userId } = req.params;

  if (!userId) {
    res.status(400).json({ message: 'ID de producto requerido' });
    return;
  }

  const { data, error } = await getAllProductByIdAdapter(userId); 

  if (error) {
    console.error('❌ Error al obtener producto:', error);
    res.status(500).json({ message: 'Error al obtener producto' });
    return;
  }

  if (!data) {
    res.status(404).json({ message: 'Producto no encontrado' });
    return;
  }

  res.status(200).json(data);
};

export const getProductByCategoryIdController = async (
  req: Request<{ categoryId: string }>,
  res: Response
): Promise<void> => {
  const { categoryId } = req.params;

  if (!categoryId) {
    res.status(400).json({ message: 'ID de producto requerido' });
    return;
  }

  const { data, error } = await getProductByCategoryIdAdapter(categoryId);

  if (error) {
    console.error('❌ Error al obtener producto:', error);
    res.status(500).json({ message: 'Error al obtener producto' });
    return;
  }

  if (!data) {
    res.status(404).json({ message: 'Producto no encontrado' });
    return;
  }

  res.status(200).json(data);
};

export const deleteProductController = async (
  req: Request<{ productId: string }>,
  res: Response
): Promise<void> => {
  const { productId } = req.params;

  if (!productId) {
    res.status(400).json({ message: 'ID de producto requerido' });
    return;
  }

  const { data, error } = await deleteProductAdapter(productId);

  if (error) {
    console.error('❌ Error al eliminar producto:', error);
    res.status(500).json({ message: 'Error al eliminar producto' });
    return;
  }

  res.status(200).json({ message: 'Producto eliminado con éxito', data });
};

export const getProductsWithoutCategoryController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { data, error } = await getProductsWithoutCategoryAdapter();

  if (error) {
    console.error('❌ Error al obtener productos sin categoría:', error);
    res.status(500).json({ message: 'Error al obtener productos sin categoría' });
    return;
  }

  res.status(200).json(data);
};

export const updateProductController = async (req: Request, res: Response): Promise<void> => {

  const { id } = req.params;
  const { name, description, price, images_url } = req.body;

  if (!id) {
    res.status(400).json({ error: 'ID de producto requerido' });
    return;
  }

  const { data, error } = await updateProductAdapter({ id, name, description, price, images_url });

  if (error) {
    res.status(500).json({ error: 'Error al actualizar el producto', message: error });
    return;
  }

  res.status(200).json({ updated: data });
};

export const getProductByIdController = async (
  req: Request<{ userId: string; productId: string }>,
  res: Response
): Promise<void> => {
  const { userId, productId } = req.params;

  if (!userId || !productId) {
    res.status(400).json({ message: 'Faltan parámetros requeridos' });
    return;
  }

  const { data, error } = await getProductByIdAdapter(userId, productId); 

  if (error) {
    console.error('❌ Error al obtener producto:', error);
    res.status(500).json({ message: 'Error al obtener producto' });
    return;
  }

  if (!data) {
    res.status(404).json({ message: 'Producto no encontrado' });
    return;
  }

  res.status(200).json(data);
};

export const getProductByNameController = async (
  req: Request<{  userId: string, searchName: string }>,
  res: Response
): Promise<void> => {
  const { userId, searchName } = req.params;

  if (!userId || !searchName) {
    res.status(400).json({ message: 'Faltan parámetros requeridos' });
    return;
  }

  const { data, error } = await getProductByNameAdapter(userId, searchName); 

  if (error) {
    console.error('❌ Error al obtener producto:', error);
    res.status(500).json({ message: 'Error al obtener producto' });
    return;
  }

  if (!data) {
    res.status(404).json({ message: 'Producto no encontrado' });
    return;
  }

  res.status(200).json(data);
};

export const getAllProductByIdCategoryIsNullController = async (
  req: Request<{ userId: string }>,
  res: Response
): Promise<void> => {
  const { userId } = req.params;

  if (!userId) {
    res.status(400).json({ message: 'ID de producto requerido' });
    return;
  }

  const { data, error } = await getAllProductByIdCategoryIsNullAdapter(userId); 

  if (error) {
    console.error('❌ Error al obtener producto:', error);
    res.status(500).json({ message: 'Error al obtener producto' });
    return;
  }

  if (!data) {
    res.status(404).json({ message: 'Producto no encontrado' });
    return;
  }

  res.status(200).json(data);
};




