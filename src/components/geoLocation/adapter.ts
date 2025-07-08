import 'dotenv/config';
import axios from 'axios';

const USER_AGENT = process.env.GEO_USER_AGENT;

if (!USER_AGENT) {
  throw new Error('🌍 GEO_USER_AGENT no está definido en las variables de entorno (.env)');
}

export const geocodeAddressAdapter = async (address: string, city: string): Promise<{ latitude: number, longitude: number }> => {
  const query = `${address}, ${city}, Argentina`;

  console.log('📬 GEO_USER_AGENT:', USER_AGENT);


  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`;

  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': USER_AGENT,
      },
    });

    const result = response.data[0];

    if (!result) {
      // Lanzamos un error con mensaje personalizado para el front
      throw new Error(`No se encontraron coordenadas para la dirección: ${address}, ${city}`);
    }

    return {
      latitude: parseFloat(result.lat),
      longitude: parseFloat(result.lon),
    };
  } catch (error: any) {
    // Si falla la petición, lanzamos un mensaje amigable
    const fallbackMessage = 'Error al obtener coordenadas de ubicación. Verificá la dirección y localidad.';
    throw new Error(error?.message || fallbackMessage);
  }
};
