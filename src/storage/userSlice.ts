import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface UserState {
    username: string
}
  
const initialState: UserState = {
    username: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        create: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        remove: (state) => {
            state.username = '';
        }
    }
})


// Action creators are generated for each case reducer function
export const { create, remove } = userSlice.actions

export default userSlice.reducer