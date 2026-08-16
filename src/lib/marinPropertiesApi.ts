import type {
  BusinessPublic,
  PublicPropertiesResponse,
  PublicProperty,
} from "@/types/property";

const MARIN_PROPERTIES_URL =
  "https://api.lbcodeworks.com.ar/api/public/marin-propiedades/products";

type ApiBusiness = Partial<BusinessPublic> & {
  id?: string;
  _id?: string;
};

type ApiProduct = Partial<PublicProperty> & {
  id?: string;
  name?: string;
  salePrice?: number;
  category?: string;
  productType?: string;
  isPublished?: boolean;
};

type MarinProductsApiResponse = {
  business?: ApiBusiness;
  products?: ApiProduct[];
  properties?: ApiProduct[];
};

export async function getMarinPublicProperties(): Promise<PublicPropertiesResponse> {
  const response = await fetch(MARIN_PROPERTIES_URL, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("No se pudieron cargar las propiedades.");
  }

  const data = (await response.json()) as MarinProductsApiResponse;

  const rawProducts = Array.isArray(data.products)
    ? data.products
    : Array.isArray(data.properties)
      ? data.properties
      : [];

  const properties: PublicProperty[] = rawProducts
    .filter((product) => {
      return product.status === "published" || product.isPublished === true;
    })
    .map((product) => normalizeProperty(product));

  return {
    business: normalizeBusiness(data.business),
    properties,
  };
}

function normalizeBusiness(
  business?: ApiBusiness
): BusinessPublic {
  return {
    _id: business?._id || business?.id || "",
    name: business?.name || "Marin Propiedades",
    slug: business?.slug || "marin-propiedades",
    logoUrl: business?.logoUrl ?? null,
    contactPhone: business?.contactPhone ?? null,
    publicEmail: business?.publicEmail ?? null,
    address: business?.address ?? null,
    description: business?.description ?? null,
    domain: business?.domain ?? null,
    primaryColor: business?.primaryColor ?? null,
    secondaryColor: business?.secondaryColor ?? null,
    businessType: business?.businessType || "real_estate",
  };
}

function normalizeProperty(
  product: ApiProduct
): PublicProperty {
  return {
    _id: product._id || product.id || product.slug || "",
    title: product.title || product.name || "Propiedad",
    slug: product.slug || product.id || product._id || "",
    description: product.description || "",
    operationType: product.operationType || "venta",
    propertyType:
      product.propertyType ||
      product.category ||
      product.productType ||
      "otro",
    status:
      product.status === "published" || product.isPublished === true
        ? "published"
        : product.status || "draft",
    price: product.price ?? product.salePrice,
    currency: product.currency || "USD",
    expenses: product.expenses,
    acceptsFinancing: product.acceptsFinancing,
    acceptsExchange: product.acceptsExchange,
    address: product.address,
    features: product.features,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
    coverImage:
      product.coverImage ||
      product.images?.find((image) => image.isCover) ||
      product.images?.[0] ||
      null,
    images: Array.isArray(product.images)
      ? product.images
      : [],
  };
}