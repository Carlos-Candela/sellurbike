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
//End method

export const get_product = createAsyncThunk(
  "product/get_product",
  async (productId, {rejectWithValue,fulfillWithValue}) => {
    try {
      const {data}= await api.get(`/product-get/${productId}`, {withCredentials: true})
      //console.log(data)
      return fulfillWithValue(data)
    }catch (error){
      return rejectWithValue(error.response.data )
    }
  }
)
//End method

export const update_product = createAsyncThunk(
  "product/update_product",
  async (product, {rejectWithValue,fulfillWithValue}) => {
    try {
      const {data}= await api.post(`/product-update`,product, {withCredentials: true})
      //console.log(data)
      return fulfillWithValue(data)
    }catch (error){
      return rejectWithValue(error.response.data )
    }
  }
)
//End method

export const product_image_update = createAsyncThunk(
  "product/product_image_update",
  async ({oldImage, newImage, productId}, {rejectWithValue,fulfillWithValue}) => {
    try {
      const formData = new FormData()
      formData.append('oldImage', oldImage)
      formData.append('newImage', newImage)
      formData.append('productId', productId)

      const {data}= await api.post(`/product-image-update`,formData, {withCredentials: true})
      //console.log(data)
      return fulfillWithValue(data)
    }catch (error){
      return rejectWithValue(error.response.data )
    }
  }
)
//End method


export const product_image_delete = createAsyncThunk(
  "product/product_image_delete",
  async ({imageUrl, productId}, {rejectWithValue,fulfillWithValue}) => {
    
    try {
      const formData = new FormData()
      formData.append('imageUrl', imageUrl);
      formData.append('productId', productId)

      const {data}= await api.post(`/product-image-delete`,formData, {withCredentials: true})
      console.log(data)
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
    product: '',
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
            .addCase(get_product.fulfilled, (state, { payload }) => {
              state.product = payload.product;
            })
            .addCase(update_product.pending, (state, { payload }) => {
              state.loader = true;
            })
            .addCase(update_product.rejected, (state, { payload }) => {
              state.loader = false;
              state.errorMessage = payload.error;
            })
            .addCase(update_product.fulfilled, (state, { payload }) => {
              state.loader = false;
              state.successMessage = payload.message;
              state.product = payload.product  
            })
            .addCase(product_image_update.fulfilled, (state, { payload }) => {
              state.successMessage = payload.message;
              state.product = payload.product
              state.errorMessage = payload.error;
              state.successMessage = payload.message;  
            })
  },
});

// Exporta las acciones y el reducer
export const { messageClear } = productReducer.actions;
export default productReducer.reducer;