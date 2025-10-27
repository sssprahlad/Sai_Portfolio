import { createSlice } from "@reduxjs/toolkit";  

const servicesSlice = createSlice({
    name: "services",
    initialState: {
        darkAndLightMode: false,
      
       
    },
    reducers: {
       setDarkAndLightMode: (state) => {
           state.darkAndLightMode = !state.darkAndLightMode;
       }
    },
}); 

export default servicesSlice.reducer;
export const { setDarkAndLightMode } = servicesSlice.actions;