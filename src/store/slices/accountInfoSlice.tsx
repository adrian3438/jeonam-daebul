import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface accountState {account : accountType}
interface accountType {
    account : any
}
const initAccountInfo : accountType = {
    account : null
}
const initialState : accountState = {
    account : initAccountInfo
}

export const accountReducer = createSlice({
    name : 'accountData',
    initialState,
    reducers : {
        setAccount : (state, action : PayloadAction<accountType>) => {
            state.account = action.payload;
        }
    }
})

export const {setAccount} = accountReducer.actions;
export default accountReducer.reducer