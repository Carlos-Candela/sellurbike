import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

// Thunk para obtener las categorías desde la base de datos
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/categories");
      return data; // Devuelve las categorías obtenidas
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const categoryAdd = createAsyncThunk(
  "categories/categoryAdd",
  async ({name,image}, {rejectWithValue,fulfillWithValue}) => {
    
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);
      const {data}= await api.post('category-add', formData, {withCredentials: true})
      // console.log(data)
      return fulfillWithValue(data)
    }catch (error){
      return rejectWithValue(error.response.data )
    }
  }
)

// Slice para manejar el estado de las categorías
const categoryReducer = createSlice({
  name: "categories",
  initialState: {
    categories: [], // Lista de categorías
    loader: false, // Indicador de carga
    errorMessage: "", // Mensaje de error
    successMessage:"",  // Mensaje de éxito
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
            .addCase(categoryAdd.pending, (state, { payload }) => {
              state.loader = true;
            })
            .addCase(categoryAdd.rejected, (state, { payload }) => {
              state.loader = false;
              state.errorMessage = payload.error;
            })
            .addCase(categoryAdd.fulfilled, (state, { payload }) => {
              state.loader = false;
              state.successMessage = payload.message;
              state.categories = [...state.categories, payload.category];
              
            })
  },
});

// Exporta las acciones y el reducer
export const { messageClear } = categoryReducer.actions;
export default categoryReducer.reducer;