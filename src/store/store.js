import { configureStore } from "@reduxjs/toolkit";
import bookmarkSlice from "./bookmarkSlice";
import quoteSlice from "./quoteSlice";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    bookmark: bookmarkSlice,
    quotes: quoteSlice,
    user: userSlice
  },
});

export default store;
