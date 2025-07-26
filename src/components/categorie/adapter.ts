import { supabaseAdmin } from '../../config/supabaseConfig';
import { CreateCategoryInput, CategoryResponse, UpdateCategoryInput} from './type';

export const createCategoryAdapter = async (
  input: CreateCategoryInput
): Promise<{ data: CategoryResponse | null; error: Error | null }> => {
  try {
    const { data, error } = await supabaseAdmin
      .from('categories_wapppedidos') // ✅ revisá que esté bien escrito
      .insert([input])
      .select()
      .single();

    if (error) {
      console.error('❌ Supabase insert error:', error);
      return { data: null, error: new Error(error.message || 'Error al insertar categoría') };
    }

    if (!data) {
      console.warn('⚠️ Insertó pero no devolvió data');
      return { data: null, error: new Error('No se devolvieron datos de la categoría creada') };
    }

    return { data, error: null };

  } catch (err) {
    console.error('❌ Error inesperado en adapter:', err);
    return { data: null, error: new Error('Error inesperado en la creación de categoría') };
  }
};


export const getAllCategorieByUserAdapter = async (
  userId: string
): Promise<{ data: CategoryResponse[] | null; error: string | null }> => {
  const { data, error } = await supabaseAdmin
    .from('categories_wapppedidos')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    console.error('❌ Error fetching categories:', error.message);
    return { data: null, error: error.message };
  }

  return { data, error: null };
};

export const updateCategoryAdapter = async (
  input: UpdateCategoryInput
): Promise<{ data: CategoryResponse | null; error: string | null }> => {
  const { id, ...fieldsToUpdate } = input;

  if (!id) {
    return { data: null, error: 'ID de categoría faltante' };
  }

  const { data, error } = await supabaseAdmin
    .from('categories_wapppedidos')
    .update(fieldsToUpdate)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('❌ Error actualizando categoría:', error.message);
    return { data: null, error: error.message };
  }

  return { data, error: null };
};

export const deleteCategoryAdapter = async (
  categoryId: string
): Promise<{ data: any; error: string | null }> => {
  try {
    const { data, error } = await supabaseAdmin
      .from('categories_wapppedidos')
      .delete()
      .eq('id', categoryId)
      .select(); // devuelve la fila eliminada

    if (error) {
      console.error('❌ Supabase delete error:', error.message);
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (err: any) {
    console.error('❌ Error inesperado en deleteCategoryAdapter:', err.message);
    return { data: null, error: 'Error inesperado eliminando categoría' };
  }
};