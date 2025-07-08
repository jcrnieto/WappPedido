export interface PersonalDataInput {
  user_id: string;
  full_name: string;
  phone: string;
  address: string;
  city: string;
  brand_name: string;
  public_url: string;
  admin_url: string;
  auth_user_id:string,
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
  user_id: string;
  auth_user_id:string,
}

 export interface UpdatePersonalDataInput {
  id: string;
  full_name: string;
  phone: string;
  address: string;
  city: string;
  brand_name: string;
}