import { createSlice } from "@reduxjs/toolkit";  

const servicesSlice = createSlice({
    name: "services",
    initialState: {
        darkAndLightMode: true,
        darkMode: true,
        myDetails: [],
    },
    reducers: {
       setDarkAndLightMode: (state) => {
           state.darkAndLightMode = !state.darkAndLightMode;
       },
       setDarkMode: (state) => {
           state.darkMode = !state.darkMode;
       },
       setMyDetails: (state, action) => {
           state.myDetails = action.payload;
       }
    },
}); 

export default servicesSlice.reducer;
export const { setDarkAndLightMode, setDarkMode, setMyDetails } = servicesSlice.actions;