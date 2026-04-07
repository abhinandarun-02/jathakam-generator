export interface PariharaTemple {
  name: string;
  remedy: string;
  enabled?: boolean;
}

export interface PariharaItem {
  deity: string;
  temples: PariharaTemple[];
}

export interface AstroData {
  name: string;
  dob: string;
  tob: string;
  pob: string;
  gender: "male" | "female" | "other";
  predictions: string;
  age?: string;
  nakshatra?: string;
  address?: string;
  email?: string;
  malayalamMonth?: string;
  arudhamRashi?: string;
  deepam?: string;
  prasnaChintha?: string;
  thamboolamRashi?: string;
  thamboolam?: string;
  thamboolamGrahangal?: string;
  udayaRashikal?: string;
  lagnaNavamsakam?: string;
  spashtangaRashi?: string;
  chandrarishti?: string;
  pariharangal?: string;
  pariharaItems?: PariharaItem[];
}
