import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import authReducer from "./authSlice";
import taskReducer from "./taskSlice";
import userReducer from './userSlice'
import projectReducer from './projectSlice'

// Create a persist configuration
const persistConfig = {
  key: "root",
  storage,
};

// Combine the reducers
const rootReducer = combineReducers({
  auth: authReducer,
  task: taskReducer,
  users:userReducer,
  projects: projectReducer
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
