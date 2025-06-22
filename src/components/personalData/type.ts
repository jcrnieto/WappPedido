export interface PersonalDataInput {
  id: string;
  full_name: string;
  phone: string;
  address: string;
  city: string;
  brand_name: string;
  opening_hours: string;
  location: {
    latitude: number;
    longitude: number;
  };
  public_url: string;
  admin_url: string;
}

export interface PersonalDataResponse {
  id: string;
  full_name: string;
  phone: string;
  address: string;
  city: string;
  brand_name: string;
  opening_hours: string;
  location: string; 
  public_url: string;
  admin_url: string;
  created_at: string;
}