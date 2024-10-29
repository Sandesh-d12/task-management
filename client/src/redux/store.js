// import { configureStore } from '@reduxjs/toolkit';
// import { persistStore, persistReducer, FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER, } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; 
// import authReducer from './authSlice';
// import taskReducer from './taskSlice'
// import {combineReducers} from 'redux'


// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, authReducer);
// const persistedTaskReducer = persistReducer(persistConfig, taskReducer)

// const store = configureStore({
//   reducer: {
//     auth: persistedReducer,
//     task: persistedTaskReducer
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });

// export const persistor = persistStore(store);

// export default store;

import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import { combineReducers } from 'redux';
import authReducer from './authSlice';
import taskReducer from './taskSlice';

// Create a persist configuration
const persistConfig = {
  key: 'root',
  storage,
};

// Combine your reducers
const rootReducer = combineReducers({
  auth: authReducer,
  task: taskReducer,
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
