import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";


export const categoryAdd = createAsyncThunk(
  "categories/categoryAdd",
  async ({name,image}, {rejectWithValue,fulfillWithValue}) => {
    
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);
      const {data}= await api.post('/category-add', formData, {withCredentials: true})
      // console.log(data)
      return fulfillWithValue(data)
    }catch (error){
      return rejectWithValue(error.response.data )
    }
  }
)
//End method



export const get_category = createAsyncThunk(
  "categories/get_category",
  async ({parPage,page, searchValue}, {rejectWithValue,fulfillWithValue}) => {
    try {
      const {data}= await api.get(`/category-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`, {withCredentials: true})
      //console.log(data)
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
    successMessage:"", // Mensaje de éxito
    totalCategory: 0, // Total de categorías
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
            .addCase(get_category.fulfilled, (state, { payload }) => {
              state.totalCategory = payload.totalCategory;
              state.categories = payload.categories;  
            })
  },
});

// Exporta las acciones y el reducer
export const { messageClear } = categoryReducer.actions;
export default categoryReducer.reducer;