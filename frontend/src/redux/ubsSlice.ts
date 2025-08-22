import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";
import type { UBSBasic } from "../types/ubs";

// Lista todas as UBS próximas
export const fetchUBS = createAsyncThunk<UBSBasic[], void>(
  "ubs/fetchUBS",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/ubs/nearby");

      // Mapeia apenas os campos de uso
      const simplified = res.data.map((ubs: any) => ({
        id: ubs.id,
        name: ubs.name,
        distance: ubs.distance,
        phone: ubs.phone,
        address: ubs.address
          ? {
              road: ubs.address.road,
              house_number: ubs.address.house_number,
              suburb: ubs.address.suburb,
              city: ubs.address.city,
              state: ubs.address.state,
              postcode: ubs.address.postcode,
              country: ubs.address.country,
            }
          : {
              road: "",
              house_number: "",
              suburb: "",
              city: "",
              state: "",
              postcode: "",
              country: "",
            },
      }));

      return simplified;
    } catch (err: any) {
      console.error("Erro ao buscar UBS:", err);

      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Erro ao buscar UBS"
      );
    }
  }
);

// Busca UBS específica pelo ID
export const fetchUBSById = createAsyncThunk<UBSBasic, number>(
  "ubs/fetchUBSById",
  async (placeId, thunkAPI) => {
    try {
      const res = await api.get(`/ubs/${placeId}`);
      const ubs = res.data;
      return {
        id: ubs.id,
        name: ubs.name,
        distance: ubs.distance,
        phone: ubs.phone,
        address: {
          road: ubs.address.road,
          house_number: ubs.address.house_number,
          suburb: ubs.address.suburb,
          city: ubs.address.city,
          state: ubs.address.state,
          postcode: ubs.address.postcode,
          country: ubs.address.country,
        },
      };
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Erro ao buscar UBS por ID"
      );
    }
  }
);

interface UBSState {
  list: UBSBasic[];
  selected: UBSBasic | null;
  loading: boolean;
  error: string | null;
}

const initialState: UBSState = {
  list: [],
  selected: null,
  loading: false,
  error: null,
};

const ubsSlice = createSlice({
  name: "ubs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Todas as UBS
      .addCase(fetchUBS.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUBS.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUBS.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // UBS específica
      .addCase(fetchUBSById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUBSById.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
      })
      .addCase(fetchUBSById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default ubsSlice.reducer;
