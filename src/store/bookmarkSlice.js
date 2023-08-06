import {createSlice} from "@reduxjs/toolkit";

const ids = JSON.parse(localStorage.getItem("bookmarked"));

const initialState = ids ? ids :  [];

const bookmarkSlice = createSlice({
    name : 'bookmark',
    initialState,
    reducers: {
        add(state,action){
            state.push(action.payload)
            
            localStorage.setItem('bookmarked', JSON.stringify(state));
            // console.log(localStorage.getItem("bookmarked"));
        },
        remove(state,action){
            const bookmarkId = action.payload;
            localStorage.setItem('bookmarked', JSON.stringify( state.filter(item => item.id !== bookmarkId)));
            return state.filter(item => item.id !== bookmarkId);
            
            
        }
    }
});

export const {add, remove} = bookmarkSlice.actions;
export default bookmarkSlice.reducer;