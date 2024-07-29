import { createSlice } from "@reduxjs/toolkit";

const ProductState = { 
  ProductList: {
    villas: [],
    apartments: [],
    houseboats: [],
    farmhouses: []
  }, 
  editingProduct: null
};

const ProductSlice = createSlice({
    name: 'Product',
    initialState: ProductState,
    reducers: {
        setProductList(state, action) {
            state.ProductList = action.payload;
        },
        setEditingProduct(state, action) {
            state.editingProduct = action.payload;
        },
        updateItem(state, action) {
            const category = action.payload.category;
            const index = state.ProductList[category].findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.ProductList[category][index] = action.payload;
            }
        },
        deleteItem(state, action) {
            const { id, category } = action.payload;
            state.ProductList[category] = state.ProductList[category].filter(item => item.id !== id);
        }
    }
});

export const Productaction = ProductSlice.actions;
export default ProductSlice;
