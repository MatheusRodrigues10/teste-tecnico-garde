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

// Cache simples em memória para reduzir chamadas repetidas
const ubsCache = new Map();

export const getUbsById = async (req, res) => {
  try {
    // Validação do ID
    const id = req.params.id?.trim();
    if (!id)
      return res.status(400).json({ message: "ID da UBS é obrigatório" });

    // Formata o ID como node, mantendo apenas números
    const osmIdFormatted = `N${id.replace(/\D/g, "")}`;

    // Verifica cache
    if (ubsCache.has(osmIdFormatted)) {
      return res.json(ubsCache.get(osmIdFormatted));
    }

    // Requisição para Nominatim
    const { data } = await axios.get(
      "https://nominatim.openstreetmap.org/lookup",
      {
        params: { osm_ids: osmIdFormatted, format: "json", addressdetails: 1 },
        headers: { "User-Agent": "UBSFinder (matheusrodrigues10r@gmail.com)" },
        timeout: 10000, // 10s
      }
    );

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "UBS não encontrada" });
    }

    // Salva no cache
    ubsCache.set(osmIdFormatted, data[0]);

    res.json(data[0]);
  } catch (error) {
    console.error("Erro ao buscar UBS por ID:", error.message);
    if (error.response && error.response.status === 429) {
      return res
        .status(429)
        .json({
          message: "Limite de requisições atingido, tente novamente mais tarde",
        });
    }
    res
      .status(500)
      .json({ message: "Erro ao buscar UBS por ID", error: error.message });
  }
};
