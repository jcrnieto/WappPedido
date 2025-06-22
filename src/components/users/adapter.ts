import { supabaseAdmin, supabase } from '../../config/supabaseConfig';
import { SimplifiedUser, LoginResponse } from './type';
import { PersonalDataResponse } from '../personalData/type';


export const getUsersAdapter = async () => {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers();

  if (error) {
    throw new Error(`Error al obtener usuarios: ${error.message}`);
  }
//   console.log('Respuesta de Supabase listUsers:', data)
  
  const users = data.users.map((user) => ({
    id: user.id,
    email: user.email,
    created_at: user.created_at
  }));
  return users;
};

export const registerAdapter = async (email: string, password: string) : Promise<SimplifiedUser | null> => {
  
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      
    });

    // console.log('registerAdapter → Supabase response:', { data, error });

    if (error || !data.user) return null;

    return {
        id: data.user.id,
        email: data.user.email!,
        created_at: data.user.created_at!,
    };
    //return await supabase.auth.signUp({ email, password });
};

export const loginAdapter = async (email: string, password: string): Promise<SimplifiedUser | null> => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  
  if (error || !data.user) return null;

  return {
    id: data.user.id,
    email: data.user.email!,
    created_at: data.user.created_at!,
  };
  //return await supabase.auth.signInWithPassword({ email, password });
};

export const getPersonalDataByUserAdapter = async (id: string): Promise<{ data: any | null; error: Error | null }> => {
  const { data: personalData, error: personalError } = await supabaseAdmin
    .from('personaldata')
    .select('*')
    .eq('id', id)
    .single();

  if (personalError) {
    return { data: null, error: personalError };
  }

  // Consultar datos del usuario
  const { data: userData, error: userError } = await supabaseAdmin.auth.admin.getUserById(id);

  if (userError) {
    return { data: null, error: userError };
  }

  // Combinar ambos objetos
  const combined = {
    id: userData.user.id,
    email: userData.user.email,
    created_at: userData.user.created_at,
    ...personalData,
  };

  return { data: combined, error: null };
};