import axios from "axios";

//Retorna coordenadas (lat/lon) a partir de um CEP brasileiro. Usa ViaCEP para endereço e OpenCage para geocoding.
export const getCoordinatesFromCep = async (cep) => {
  if (!cep) return null;

  const sanitizedCep = cep.replace(/\D/g, "");
  try {
    //Consulta ViaCEP
    const viaCepRes = await axios.get(
      `https://viacep.com.br/ws/${sanitizedCep}/json/`
    );
    if (viaCepRes.data.erro) return null;

    const { logradouro, bairro, localidade, uf } = viaCepRes.data;
    const addressStr = `${logradouro}, ${bairro}, ${localidade}, ${uf}, Brasil`;

    //Consulta OpenCage Geocoding para converter em coordenadas
    const geoRes = await axios.get(
      "https://api.opencagedata.com/geocode/v1/json",
      {
        params: {
          q: addressStr,
          key: process.env.OPENCAGE_API_KEY, // chave OpenCage
          limit: 1,
        },
      }
    );

    if (!geoRes.data.results || geoRes.data.results.length === 0) return null;

    const { lat, lng } = geoRes.data.results[0].geometry;
    return { lat, lon: lng };
  } catch (error) {
    console.error("Erro ao buscar coordenadas:", error.message);
    return null;
  }
};
