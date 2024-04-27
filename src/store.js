import { configureStore, combineReducers } from "@reduxjs/toolkit";
import factFormReducer from "./reducers/factFormSlice";
import factsSlice from "./reducers/factsSlice";

const rootReducer = combineReducers({
  factForm: factFormReducer,
  facts: factsSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
