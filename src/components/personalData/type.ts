export interface PersonalDataInput {
  id: string;
  full_name: string;
  phone: string;
  address: string;
  city: string;
  brand_name: string;
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
  public_url: string;
  admin_url: string;
  created_at: string;
}