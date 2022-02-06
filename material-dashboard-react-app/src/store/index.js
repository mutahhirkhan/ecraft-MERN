import storage from "redux-persist/lib/storage";
import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

// import dashboardReducer from "./../features/dashboards/slice";
import loginReducer from "./../views/Pages/slice";
import dashboardReducer from "./../views/Dashboard/slice";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

const persistConfig = {
    key: "root",
    version: 1,
    storage,
    whitelist: ["login"],
};

const reducers = combineReducers({
    login: loginReducer,
    dashboard: dashboardReducer,
    // signIn: signInReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PURGE, REGISTER, PERSIST],
        },
    }),
});

export let persistor = persistStore(store);
