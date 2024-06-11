export interface Item {
  [key: string]: string | number | undefined;
  name?: string;
  url?: string;
  created?: string;
  edited?: string;
  height?: number;
  mass?: number;
  hair_color?: string;
  skin_color?: string;
  eye_color?: string;
  birth_year?: string;
  gender?: 'male'|'female'|'n/a';
  homeworld?: string;
  model?: string;
  starship_class?: string;
  manufacturer?: string;
  cost_in_credits?: string;
  lenght?: string;
  crew?: number;
  passengers?: number;
  max_atmosphering_speed?: number;
  hyperdrive_rating?: number;
  MGLT?: number
  cargo_capacity?: number;
  consumables?: string;
  pilots?: string;
  uid: number;
}
