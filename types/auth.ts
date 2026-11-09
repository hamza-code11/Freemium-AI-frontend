// frontend/types/auth.ts
export interface BusinessProfile {
  id: number;
  business_name: string;
  business_type: string;
  services: string;
  target_audience: string[]; 
  business_goals?: string;
  business_description?: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  image: string | null;
  created_at: string;
  business_profiles?: BusinessProfile[];
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user?: User;
}
