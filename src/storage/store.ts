import { configureStore } from '@reduxjs/toolkit';
import { taskReducer } from './taskSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    // @ts-ignore
    tasks: taskReducer,
    user: userReducer
  },
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']