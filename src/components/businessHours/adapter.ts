import { supabaseAdmin } from '../../config/supabaseConfig';
import { BusinessHourInput } from './type';


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

  // Insertamos todos los días juntos
  const { data, error } = await supabaseAdmin
    .from('business_hours_wapppedidos')
    .insert(formatted);

  return { data, error };
};
