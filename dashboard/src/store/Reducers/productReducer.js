import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";


export const add_product = createAsyncThunk(
  "product/add_product",
  async (product, {rejectWithValue,fulfillWithValue}) => {
    
    try {
      
      const {data}= await api.post('/product-add', product,{withCredentials: true})
      //console.log(data)
      return fulfillWithValue(data)
    }catch (error){
      return rejectWithValue(error.response.data )
    }
  }
)
//End method



export const get_products = createAsyncThunk(
  "product/get_products",
  async ({parPage,page, searchValue}, {rejectWithValue,fulfillWithValue}) => {
    try {
      const {data}= await api.get(`/products-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`, {withCredentials: true})
      //console.log(data)
      return fulfillWithValue(data)
    }catch (error){
      return rejectWithValue(error.response.data )
    }
  }
)


// Slice para manejar el estado de las productos
const productReducer = createSlice({
  name: "product",
  initialState: {
    products: [], // Lista de productos
    loader: false, // Indicador de carga
    errorMessage: "", // Mensaje de error
    successMessage:"", // Mensaje de éxito
    totalProduct: 0, // Total de productos
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
            .addCase(add_product.pending, (state, { payload }) => {
              state.loader = true;
            })
            .addCase(add_product.rejected, (state, { payload }) => {
              state.loader = false;
              state.errorMessage = payload.error;
            })
            .addCase(add_product.fulfilled, (state, { payload }) => {
              state.loader = false;
              state.successMessage = payload.message;
              state.products = [...state.products, payload.product];  
            })
            .addCase(get_products.fulfilled, (state, { payload }) => {
              state.totalProduct = payload.totalProduct;
              state.products = payload.products;  
            })
  },
});

// Exporta las acciones y el reducer
export const { messageClear } = productReducer.actions;
export default productReducer.reducer;