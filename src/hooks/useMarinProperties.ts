import { useEffect, useMemo, useState } from "react";
import { getMarinPublicProperties } from "@/lib/marinPropertiesApi";
import type {
  BusinessPublic,
  PropertyOperationType,
  PropertyType,
  PublicProperty,
} from "@/types/property";

type UseMarinPropertiesFilters = {
  operationType?: PropertyOperationType | "todas" | "Todas";
  propertyType?: PropertyType | "todas" | "Todos";
  zone?: string;
  search?: string;
};

export function useMarinProperties(filters?: UseMarinPropertiesFilters) {
  const [business, setBusiness] = useState<BusinessPublic | null>(null);
  const [properties, setProperties] = useState<PublicProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadProperties() {
    try {
      setLoading(true);
      setError(null);

      const data = await getMarinPublicProperties();

      setBusiness(data.business);
      setProperties(Array.isArray(data.properties) ? data.properties : []);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Ocurrió un error al cargar las propiedades."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProperties();
  }, []);

  const publishedProperties = useMemo(() => {
    return properties.filter((property) => property.status === "published");
  }, [properties]);

  const zones = useMemo(() => {
    const values = publishedProperties
      .map((property) => getPropertyZone(property))
      .filter(Boolean);

    return ["Todas", ...Array.from(new Set(values))];
  }, [publishedProperties]);

  const propertyTypes = useMemo(() => {
    const values = publishedProperties
      .map((property) => property.propertyType)
      .filter(Boolean);

    return ["Todos", ...Array.from(new Set(values))];
  }, [publishedProperties]);

  const filteredProperties = useMemo(() => {
    const search = filters?.search?.trim().toLowerCase();
    const operationType = filters?.operationType;
    const propertyType = filters?.propertyType;
    const zone = filters?.zone;

    return publishedProperties.filter((property) => {
      const propertyZone = getPropertyZone(property);

      const matchesOperation =
        !operationType ||
        operationType === "todas" ||
        operationType === "Todas" ||
        property.operationType === operationType;

      const matchesType =
        !propertyType ||
        propertyType === "todas" ||
        propertyType === "Todos" ||
        property.propertyType === propertyType;

      const matchesZone =
        !zone || zone === "Todas" || propertyZone === zone;

      const searchableText = [
        property.title,
        property.description,
        property.operationType,
        property.propertyType,
        property.address?.street,
        property.address?.number,
        property.address?.neighborhood,
        property.address?.city,
        property.address?.state,
        property.address?.country,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = !search || searchableText.includes(search);

      return matchesOperation && matchesType && matchesZone && matchesSearch;
    });
  }, [
    publishedProperties,
    filters?.operationType,
    filters?.propertyType,
    filters?.zone,
    filters?.search,
  ]);

  return {
    business,
    properties,
    publishedProperties,
    filteredProperties,
    zones,
    propertyTypes,
    loading,
    error,
    reload: loadProperties,
  };
}

function getPropertyZone(property: PublicProperty) {
  return (
    property.address?.neighborhood ||
    property.address?.city ||
    property.address?.state ||
    ""
  );
}