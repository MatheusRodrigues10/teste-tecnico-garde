import axios from "axios";
import { getCoordinatesFromCep } from "../utils/geocoding.js";
import { getDistanceKm } from "../utils/distance.js";
import { buildOverpassQuery } from "../utils/overpassQuery.js";

// Lista UBS ou hospitais próximos
export const getNearbyUbs = async (req, res) => {
  try {
    const { address } = req.user;
    if (!address)
      return res.status(400).json({ message: "CEP não encontrado no perfil" });

    const userCoords = await getCoordinatesFromCep(address);
    if (!userCoords)
      return res
        .status(404)
        .json({ message: "Não foi possível obter coordenadas para o CEP" });

    // Monta a query para Overpass API
    const query = buildOverpassQuery(userCoords.lat, userCoords.lon);

    // Requisição POST com Content-Type text/plain (Overpass API espera isso)
    const { data } = await axios.post(
      "https://overpass-api.de/api/interpreter",
      query,
      { headers: { "Content-Type": "text/plain" } }
    );

    if (!data.elements || data.elements.length === 0)
      return res
        .status(404)
        .json({ message: "Nenhuma unidade de saúde encontrada" });

    // Calcula distância, filtra até 50km e ordena do mais próximo ao mais distante
    const ubsWithDistance = data.elements
      .map((ubs) => ({
        id: ubs.id,
        name: ubs.tags?.name || "Sem nome",
        type: ubs.tags?.amenity || "Desconhecido",
        lat: ubs.lat,
        lon: ubs.lon,
        distance: getDistanceKm(
          userCoords.lat,
          userCoords.lon,
          ubs.lat,
          ubs.lon
        ),
      }))
      .filter((ubs) => ubs.distance <= 50)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 12); // Limita aos 20 mais próximos

    res.json(ubsWithDistance);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erro ao buscar UBS", error: error.message });
  }
};

// Busca UBS específica pelo osm_id
export const getUbsById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id)
      return res.status(400).json({ message: "ID da UBS é obrigatório" });

    const osmIdFormatted = `N${id}`;

    const { data } = await axios.get(
      "https://nominatim.openstreetmap.org/lookup",
      { params: { osm_ids: osmIdFormatted, format: "json", addressdetails: 1 } }
    );

    if (!data || data.length === 0)
      return res.status(404).json({ message: "UBS não encontrada" });

    // Normaliza os dados para o frontend
    const ubs = data[0];
    res.json({
      id: ubs.place_id,
      name: ubs.display_name,
      address: {
        road: ubs.address.road || "",
        house_number: ubs.address.house_number || "",
        suburb: ubs.address.suburb || "",
        city: ubs.address.city || "",
        state: ubs.address.state || "",
        postcode: ubs.address.postcode || "",
        country: ubs.address.country || "",
      },
      lat: ubs.lat,
      lon: ubs.lon,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erro ao buscar UBS por ID", error: error.message });
  }
};
