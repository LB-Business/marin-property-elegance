export type PropertyOperationType = "venta" | "alquiler" | "temporario";

export type PropertyType =
  | "casa"
  | "departamento"
  | "terreno"
  | "lote"
  | "local"
  | "oficina"
  | "galpon"
  | "campo"
  | "ph"
  | "duplex"
  | "desarrollo"
  | "otro"
  | string;

export type PropertyStatus =
  | "draft"
  | "published"
  | "paused"
  | "sold"
  | "rented"
  | string;

export type BusinessPublic = {
  _id: string;
  name: string;
  slug: string;
  logoUrl: string | null;
  contactPhone: string | null;
  publicEmail: string | null;
  address: string | null;
  description: string | null;
  domain: string | null;
  primaryColor: string | null;
  secondaryColor: string | null;
  businessType: string;
};

export type PropertyImage = {
  url: string;
  publicId?: string;
  order?: number;
  isCover?: boolean;
};

export type PropertyAddress = {
  street?: string;
  number?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  showExactLocation?: boolean;
};

export type PropertyFeatures = {
  totalArea?: number;
  coveredArea?: number;
  rooms?: number;
  bedrooms?: number;
  bathrooms?: number;
  garages?: number;
  age?: number;
  floors?: number;
  hasPool?: boolean;
  hasGrill?: boolean;
  hasGarden?: boolean;
  hasSecurity?: boolean;
  hasElevator?: boolean;
  hasBalcony?: boolean;
  hasTerrace?: boolean;
};

export type PublicProperty = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  operationType: PropertyOperationType | string;
  propertyType: PropertyType;
  status: PropertyStatus;
  price?: number;
  currency?: "ARS" | "USD" | string;
  expenses?: number;
  acceptsFinancing?: boolean;
  acceptsExchange?: boolean;
  address?: PropertyAddress;
  features?: PropertyFeatures;
  createdAt?: string;
  updatedAt?: string;
  coverImage?: PropertyImage | null;
  images?: PropertyImage[];
};

export type PublicPropertiesResponse = {
  business: BusinessPublic;
  properties: PublicProperty[];
};