import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllProducts = createAsyncThunk("recipes/fetchAllProducts",async ()=>{
  const result =await axios.get("https://dummyjson.com/recipes")
  //console.log(result);
  sessionStorage.setItem("allProducts",JSON.stringify(result.data.recipes))
  return result.data.recipes 
  
})

const prodoctSlice =createSlice({
    name:'recipes',
    initialState:{
           allProducts:[],
           dummyAllProducts:[],
           loading:false,
           error:""
           
           
    },
    reducers:{
        searchProduct : (state,actionFromHeader)=>{
         state.allProducts =   state.dummyAllProducts.filter(item=>item.cuisine.toLowerCase().includes(actionFromHeader.payload))
        }

    },
    extraReducers:(builder) =>{
        //fetchallproducts is the action
        //reducer is used to update value
        //extrareducer used to change asyn to sync an to display it

        builder.addCase(fetchAllProducts.fulfilled,(state,apiResult) =>{
            state.allProducts  = apiResult.payload
            state.dummyAllProducts = apiResult.payload
            state.loading  =false
            state.error  =""
        })
        builder.addCase(fetchAllProducts.pending,(state,apiResult) =>{
            state.allProducts  = []
            state.dummyAllProducts=[]
            state.loading  =true
            state.error  =""
        })
        builder.addCase(fetchAllProducts.rejected,(state,apiResult) =>{
            state.allProducts  = []
            state.dummyAllProducts=[]
            state.loading  =false
            state.error  ="Api call Failed please ty again"
        })
        
    }
})
export const {searchProduct}= prodoctSlice.actions
export default prodoctSlice.reducer