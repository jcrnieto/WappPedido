import { supabaseAdmin } from '../../config/supabaseConfig';
import { BusinessHourInput } from './type';

// export const createBusinessHoursAdapter = async (
//   user_id: string,
//   hours: BusinessHourInput[]
// ): Promise<{ data: any; error: any }> => {
//   const formatted = hours.map((hour) => ({
//     user_id,
//     day: hour.day,
//     from_1: hour.from_1,
//     to_1: hour.to_1,
//     from_2: hour.from_2 || null,
//     to_2: hour.to_2 || null,
//   }));

//   const { data, error } = await supabaseAdmin
//     .from('business_hours_wapppedidos')
//     .upsert(formatted, { onConflict: 'user_id' }) // ✅ sin corchetes adicionales
//     .select(); // ✅ sin .single()

//   return { data, error };
// };

export const createBusinessHoursAdapter = async (
  user_id: string,
  hours: BusinessHourInput[]
): Promise<{ data: any; error: any }> => {
  const formatted = hours.map((hour) => ({
    user_id,
    day: hour.day,
    from_1: hour.from_1,
    to_1: hour.to_1,
    from_2: hour.from_2 || null,
    to_2: hour.to_2 || null,
  }));

  // Upsert con clave única (user_id + day)
  const { error } = await supabaseAdmin
    .from('business_hours_wapppedidos')
    .upsert(formatted, { onConflict: 'user_id,day' });

  if (error) return { data: null, error };

  // Traer registros actualizados
  const { data, error: fetchError } = await supabaseAdmin
    .from('business_hours_wapppedidos')
    .select('*')
    .eq('user_id', user_id);

  return { data, error: fetchError };
};


export const getBusinessHoursByUserAdapter = async (
  user_id: string
): Promise<{ data: any[] | null; error: string | null }> => {
  const { data, error } = await supabaseAdmin
    .from('business_hours_wapppedidos')
    .select('*')
    .eq('user_id', user_id)
    .order('day', { ascending: true });

  if (error) {
    console.error('❌ Error obteniendo horarios:', error.message);
    return { data: null, error: error.message };
  }

  return { data, error: null };
};
