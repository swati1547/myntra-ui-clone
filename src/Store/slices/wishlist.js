import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("wishlist")) || [];

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const { productId, selectedColor } = action.payload;

      // prevent duplicate - same color
      const exists = state.some(
        (item) =>
          item.productId === productId && item.selectedColor === selectedColor,
      );

      if (!exists) {
        state.push({ productId, selectedColor });
        localStorage.setItem("wishlist", JSON.stringify(state));
      }
    },

    removeFromWishlist: (state, action) => {
      const { productId, selectedColor } = action.payload;
      //filter creates new array
      const updatedState = state.filter(
        (item) =>
          !(
            item.productId === productId && item.selectedColor === selectedColor
          ),
      );

      localStorage.setItem("wishlist", JSON.stringify(updatedState));
      return updatedState; // updated state entirely
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
