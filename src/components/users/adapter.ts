import { supabaseAdmin, supabase } from '../../config/supabaseConfig';
import { SimplifiedUser } from './type';
//import { PersonalDataResponse } from '../personalData/type';


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

export const registerAdapter = async (email: string) : Promise<SimplifiedUser | null> => {
  
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      email_confirm: true
      
    });

    if (error || !data.user) return null;

     const user = data.user;

    // Crear también en tu tabla personalizada
    const { error: insertError } = await supabaseAdmin
      .from('users_wapppedidos')
      .insert({
        id: user.id, // UUID de autenticación
        email: user.email,
        created_at: user.created_at,
        profile_completed: false
      });

    if (insertError) {
      console.error('❌ Error al crear usuario en tabla users:', insertError);
      return null;
    }

    return {
        id: user.id,
        email: user.email!,
        created_at: user.created_at!,
        personalData: null
    };
    
};

export const loginAdapter = async (email: string, password: string): Promise<SimplifiedUser | null> => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  
  if (error || !data.user) return null;

  return {
    id: data.user.id,
    email: data.user.email!,
    created_at: data.user.created_at!,
    personalData: null
  };
  //return await supabase.auth.signInWithPassword({ email, password });
};

export const getPersonalDataByUserAdapter = async (id: string): Promise<{ data: any | null; error: Error | null }> => {
  const { data: personalData, error: personalError } = await supabaseAdmin
    .from('personal_data')
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

export const getUserByEmailAdapter = async (email: string): Promise<SimplifiedUser | null> => {
  const { data, error } = await supabaseAdmin
    .from('users_wapppedidos')
    .select('*, personal_data(*)')
    .eq('email', email)
    .limit(1)
    .maybeSingle();

  if (error || !data) {
    console.error('❌ Error al buscar usuario en users_wapppedidos:', error);
    return null;
  }

  return {
    id: data.id,
    email: data.email,
    created_at: data.created_at,
    profile_completed: data.profile_completed,
    personalData: data.personal_data || {}, 
  };
};