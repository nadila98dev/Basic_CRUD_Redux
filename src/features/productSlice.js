import {createSlice, createAsyncThunk, createEntityAdapter} from "@reduxjs/toolkit"
import axios from "axios"

const apiUrl = process.env.API_KEY

export const getProducts = createAsyncThunk("products/getProducts", async() => {
    const response = await axios.get(apiUrl)
    return response.data
})

export const saveProducts = createAsyncThunk("products/saveProducts", async({title, price}) => {
    const response = await axios.post(apiUrl, {
        title,
        price
    })
    return response.data
})

export const deleteProducts = createAsyncThunk("products/deleteProducts", async(id) => {
    await axios.delete(`${apiUrl}/${id}`)
    return id
})

export const updateProducts = createAsyncThunk("products/updateProducts", async({id , title, price}) => {
    const response = await axios.patch(`${apiUrl}/${id}`, {
        title,
        price
    })
    return response.data
})

const productEntity = createEntityAdapter({
    selectId: (product) => product.id
})

const productSlice = createSlice({
    name: "product",
    initialState: productEntity.getInitialState(),
    extraReducers: (builder) => {
        builder.addCase(getProducts.fulfilled, (state, action) => {
            productEntity.setAll(state, action.payload)
        })
        builder.addCase(saveProducts.fulfilled, (state, action) => {
            productEntity.addOne(state, action.payload)
        })
        builder.addCase(deleteProducts.fulfilled, (state, action) => {
            productEntity.removeOne(state, action.payload)
        })
        builder.addCase(updateProducts.fulfilled, (state, action) => {
            productEntity.updateOne(state, {id: action.payload.id, changes: action.payload,})
        })
    }
})
export const productSelectors = productEntity.getSelectors(state => state.product)
export default productSlice.reducer