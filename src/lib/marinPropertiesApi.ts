import type { PublicPropertiesResponse } from "@/types/property";

const MARIN_PROPERTIES_URL =
  "https://api.lbcodeworks.com.ar/api/public/businesses/marin-propiedades/properties";

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

  return response.json();
}