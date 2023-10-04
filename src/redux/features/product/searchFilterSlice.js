import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProduct: [],
};

const searchFilterSlice = createSlice({
  name: "filterSearch",
  initialState,
  reducers: {
    SEARCH_FILTER_PRODUCT(state, action) {
      //expecting 2 payload
      const { products, search } = action.payload;
      const tempProducts = products.filter(
        (product) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase())
      );

      state.filteredProduct = tempProducts;
    },
  },
});

export const { SEARCH_FILTER_PRODUCT } = searchFilterSlice.actions;

//USESELECTOR TO ACCESS THIS IN COMPONENT
export const selectFilteredProducts = (state) => state.filter.filteredProduct;

export default searchFilterSlice.reducer;
