import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  quotes: [],
  tags: [],
};

const quoteSlice = createSlice({
  name: "quotes",
  initialState,
  reducers: {
   
  },
  extraReducers : (builder) => {
        builder
        .addCase(getQuotes.fulfilled, (state, action) => {
            state.quotes = [action.payload];
            // console.log(state.quotes)
        });
        builder.addCase(getTags.fulfilled, (state, action) => {
            state.tags = action.payload;
            // console.log(state.tags);
          });
  }
});

export const { fetchQuotes } = quoteSlice.actions;
export default quoteSlice.reducer;


export const getTags = createAsyncThunk("quotes/getTags", async () => {
    const response = await fetch("http://api.quotable.io/tags");
    const data = await response.json();
    console.log(data);
    return data;
  });

  export const getQuotes = createAsyncThunk("quotes/getQuotes", async (tags) => {
    let url = "http://api.quotable.io/random";
    if (tags) {
      url = `http://api.quotable.io/random?tags=${tags}`;
    }
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  });


