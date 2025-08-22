import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  id: string;
  name: string;
  email: string;
  address?: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
  loading: false,
  error: null,
};

// Cadastro
export const registerUser = createAsyncThunk(
  "users/register",
  async (
    {
      name,
      email,
      password,
      address,
    }: { name: string; email: string; password: string; address: string },
    { rejectWithValue }
  ) => {
    if (!name || !email || !password || !address) {
      return rejectWithValue("Todos os campos são obrigatórios.");
    }
    try {
      const res = await api.post("/users/register", {
        name: name.trim(),
        email: email.trim(),
        password,
        address: address.trim(),
      });

      // Criar objeto user para Redux
      const user: User = {
        id: res.data._id,
        name: res.data.name,
        email: res.data.email,
        address: res.data.address,
      };

      if (res.data.token) await AsyncStorage.setItem("token", res.data.token);
      await AsyncStorage.setItem("user", JSON.stringify(user));

      return { token: res.data.token, user };
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Erro no cadastro");
    }
  }
);

// Login
export const loginUser = createAsyncThunk(
  "users/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    if (!email || !password)
      return rejectWithValue("Email e senha são obrigatórios.");

    try {
      const res = await api.post("/users/login", {
        email: email.trim(),
        password,
      });

      // Criar objeto user para Redux
      const user: User = {
        id: res.data._id,
        name: res.data.name,
        email: res.data.email,
        address: res.data.address,
      };

      if (res.data.token) await AsyncStorage.setItem("token", res.data.token);
      await AsyncStorage.setItem("user", JSON.stringify(user));

      return { token: res.data.token, user };
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Erro no login");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.error = null;
      AsyncStorage.removeItem("token");
      AsyncStorage.removeItem("user");
    },
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Cadastro
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      registerUser.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      }
    );
    builder.addCase(registerUser.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Login
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      loginUser.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      }
    );
    builder.addCase(loginUser.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { logout, resetError } = authSlice.actions;
export default authSlice.reducer;
