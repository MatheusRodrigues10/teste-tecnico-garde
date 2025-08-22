//Query de Busca
export const buildOverpassQuery = (lat, lon, radius = 50000) => `
[out:json][timeout:50];
(
  // UBS
  node["amenity"="clinic"]["name"~"UBS|Unidade Básica de Saúde", i](around:${radius},${lat},${lon});
  
  // Hospitais
  node["amenity"="hospital"]["name"~"Hospital|Maternidade", i](around:${radius},${lat},${lon});
  
  // Postos de saúde
  node["amenity"="health_post"](around:${radius},${lat},${lon});
);
out center;
`;
