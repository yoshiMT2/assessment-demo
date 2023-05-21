export type Token = {
  refresh: string;
  access: string;
}

export type Decoded = {
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  user_id: number;
}

export type User = {
  id: number;
  name: string;
  email: string;
  is_active: boolean;
  is_staff: boolean;
  member_category: number;
  random_team: string;
  team_relation: string;
}