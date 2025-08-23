import { supabaseAdmin } from '../../config/supabaseConfig';
import { CreateProductInput, ProductResponse } from './type';

export const createProductAdapter = async (
  input: CreateProductInput
): Promise<{ data: ProductResponse | null; error: any }> => {
  const { data, error } = await supabaseAdmin
    .from('products_wapppedidos')
    .insert([
      {
        name: input.name,
        description: input.description,
        price: input.price,
        images_url: input.images_url || [],
        category_id: input.category_id, // puede ser null
        user_id: input.user_id // ID del usuario que crea el producto
      }
    ])
    .select()
    .single();

    if (error) {
        console.error('❌ Supabase insert error:', error);
    }

  return { data, error };
};

export const getAllProductByIdAdapter = async (
    userId: string
): Promise<{ data: ProductResponse[] | null; error: any }> => {
  const { data, error } = await supabaseAdmin
    .from('products_wapppedidos')
    .select('*')
    .eq('user_id', userId)
    

  if (error) {
    console.error('❌ Supabase select error:', error);
  }

   return { data: data || [], error };
};

export const getProductByCategoryIdAdapter = async (
    categoryId: string
): Promise<{ data: ProductResponse[] | null; error: any }> => {
  const { data, error } = await supabaseAdmin
    .from('products_wapppedidos')
    .select('*')
    .eq('category_id', categoryId)

  if (error) {
    console.error('❌ Supabase select error:', error);
  }

  return { data: data || [], error };
};

export const deleteProductAdapter = async (
  productId: string
): Promise<{ data: any; error: string | null }> => {
  try {
    // 1. Obtener el producto para leer la URL de la imagen
    const { data: product, error: fetchError } = await supabaseAdmin
      .from('products_wapppedidos')
      .select('images_url')
      .eq('id', productId)
      .single();

    if (fetchError) {
      console.error('❌ Error obteniendo producto antes de eliminar:', fetchError.message);
      return { data: null, error: fetchError.message };
    }

    // 2. Si hay imágenes, eliminar cada una del storage
    if (Array.isArray(product?.images_url) && product.images_url.length > 0) {
      for (const imageUrl of product.images_url) {
        const publicIndex = imageUrl.indexOf('/object/public/');
        if (publicIndex !== -1) {
          const path = imageUrl.substring(publicIndex + '/object/public/'.length); // bucket/file.png
          const [bucket, ...filePathParts] = path.split('/');
          const filePath = filePathParts.join('/');

          const { error: storageError } = await supabaseAdmin.storage.from(bucket).remove([filePath]);
          if (storageError) {
            console.error(`❌ Error eliminando imagen (${imageUrl}):`, storageError.message);
          }
        }
      }
    }

    // 3. Eliminar el producto de la tabla
    const { data, error } = await supabaseAdmin
      .from('products_wapppedidos')
      .delete()
      .eq('id', productId)
      .select(); // devuelve la fila eliminada

    if (error) {
      console.error('❌ Supabase delete error:', error.message);
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (err: any) {
    console.error('❌ Error inesperado en deleteProductAdapter:', err.message);
    return { data: null, error: 'Error inesperado eliminando producto' };
  }
};

export const getProductsWithoutCategoryAdapter = async (): Promise<{ data: ProductResponse[]; error: any }> => {
  const { data, error } = await supabaseAdmin
    .from('products_wapppedidos')
    .select('*')
    .is('category_id', null);
  if (error) {
    console.error('❌ Supabase select error:', error);
  }

  return { data: (data as ProductResponse[]) || [], error };
};

export const updateProductAdapter = async (
  input: CreateProductInput
): Promise<{ data: ProductResponse | null; error: string | null }> => {
  const { id, ...fieldsToUpdate } = input;

  if (!id) {
    return { data: null, error: 'ID de producto faltante' };
  }

  const { data, error } = await supabaseAdmin
    .from('products_wapppedidos')
    .update(fieldsToUpdate)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('❌ Error actualizando producto:', error.message);
    return { data: null, error: error.message };
  }

  return { data, error: null };
};

export const getProductByIdAdapter = async (
  userId: string,
  productId: string
): Promise<{ data: any | null; error: any }> => {
  const { data, error } = await supabaseAdmin
    .from('products_wapppedidos')
    .select('*')
    .eq('id', productId)
    .eq('user_id', userId) 
    .single(); 

  if (error) {
    console.error('❌ Supabase select error:', error);
  }

  return { data, error };
};

export const getProductByNameAdapter = async (
  userId: string,
  searchName: string
): Promise<{ data: any | null; error: any }> => {
  const { data, error } = await supabaseAdmin
    .from('products_wapppedidos')
    .select('*')
    .eq('user_id', userId) 
    
  if (error) {
    console.error('❌ Supabase select error:', error);
    return { data: null, error };
  }

  const filtered = data?.filter((p) =>
    p.name.toLowerCase().includes(searchName.toLowerCase())
  )|| [];

  return { data: filtered, error: null };
};

export const getAllProductByIdCategoryIsNullAdapter = async (
    userId: string
): Promise<{ data: ProductResponse[] | null; error: any }> => {
  const { data, error } = await supabaseAdmin
    .from('products_wapppedidos')
    .select('*')
    .eq('user_id', userId)
    .is('category_id', null);

  if (error) {
    console.error('❌ Supabase select error:', error);
  }

   return { data: data || [], error };
};