import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/services";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';


const persistConfig = {
    key: 'root',
    storage,
    
}

const rootReducer = combineReducers({
    services: userReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
})

const persistor = persistStore(store)

export default store
export { persistor }