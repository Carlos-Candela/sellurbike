import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";



export const checkout_pay = createAsyncThunk(
  "order/checkout_pay",
  async ({ buyerId, sellerId, productId, amount, platformCalcInsurance, paymentMethod }, { rejectWithValue, fulfillWithValue }) => {
    const dataSend = {buyerId,sellerId,productId,amount, platformCalcInsurance, paymentMethod}
    try {
      
      const { data } = await api.post("/checkout", dataSend , {
        withCredentials: true,
      });
      //console.log(data)
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
//End method

export const get_orders_user = createAsyncThunk(
  "user/get_orders_user",
  async (userId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/get-orders`, {userId}, {
        withCredentials: true,
      });
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


// Slice para manejar el estado de las ordenes
const orderReducer = createSlice({
  name: "order",
  initialState: {
    orders: [], // Lista de orders
    order:"",
    loader: false, // Indicador de carga
    errorMessage: "", // Mensaje de error
    successMessage: "", // Mensaje de éxito
    totalOrders: 0, // Total de ordenes
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkout_pay.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(checkout_pay.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(checkout_pay.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.order = payload.order
        
      })
      
  },
});

// Exporta las acciones y el reducer
export const { messageClear } = orderReducer.actions;
export default orderReducer.reducer;