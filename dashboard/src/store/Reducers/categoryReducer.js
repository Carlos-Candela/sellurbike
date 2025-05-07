import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk para obtener las categorías desde la base de datos
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/categories");
      return data.categories; // Devuelve las categorías obtenidas
    } catch (error) {
      return rejectWithValue(error.response.data || "Error al obtener categorías");
    }
  }
);

// Slice para manejar el estado de las categorías
const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: [], // Lista de categorías
    loader: false, // Indicador de carga
    errorMessage: "", // Mensaje de error
  },
  reducers: {
    clearError: (state) => {
      state.errorMessage = ""; // Limpia el mensaje de error
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loader = true; // Activa el indicador de carga
      })
      .addCase(fetchCategories.fulfilled, (state, { payload }) => {
        state.loader = false; // Desactiva el indicador de carga
        state.categories = payload; // Almacena las categorías en el estado
      })
      .addCase(fetchCategories.rejected, (state, { payload }) => {
        state.loader = false; // Desactiva el indicador de carga
        state.errorMessage = payload || "Error al cargar las categorías"; // Maneja el error
      });
  },
});

// Exporta las acciones y el reducer
export const { clearError } = categorySlice.actions;
export default categorySlice.reducer;