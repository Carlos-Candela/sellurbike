import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_seller_request = createAsyncThunk(
  "seller/get_seller_request",
  async (
    { parPage, page, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/request-seller-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,
        { withCredentials: true }
      );
      //console.log(data)
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
//End Method

export const get_seller = createAsyncThunk(
  "seller/get_seller",
  async (sellerId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/get-seller/${sellerId}`, {
        withCredentials: true,
      });
      //console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
//End Method

export const seller_status_update = createAsyncThunk(
  "seller/seller_status_update",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/seller-status-update`, info, {
        withCredentials: true,
      });
      //console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
//End Method

// Slice para manejar el estado de las categorías
const sellerReducer = createSlice({
  name: "seller",
  initialState: {
    sellers: [],
    loader: false,
    errorMessage: "",
    successMessage: "",
    totalSeller: 0,
    seller: "",
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_seller_request.fulfilled, (state, { payload }) => {
        state.sellers = payload.sellers;
        state.totalSeller = payload.totalSeller;
      })
      .addCase(get_seller.fulfilled, (state, { payload }) => {
        state.seller = payload.seller;
      })
      .addCase(seller_status_update.fulfilled, (state, { payload }) => {
        state.seller = payload.seller;
        state.successMessage = payload.message
        state.errorMessage = payload.error
      });
  },
});

// Exporta las acciones y el reducer
export const { messageClear } = sellerReducer.actions;
export default sellerReducer.reducer;
