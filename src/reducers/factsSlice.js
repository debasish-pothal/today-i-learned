import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../supabase"; // Import your Supabase client instance

// Define an async thunk to fetch data from the Supabase API
export const fetchFacts = createAsyncThunk("facts/fetchFacts", async () => {
  try {
    const { data, error } = await supabase
      .from("facts")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    throw error;
  }
});

// Define an async thunk to fetch filtered facts from the Supabase API
export const fetchFilteredFacts = createAsyncThunk(
  "facts/fetchFilteredFacts",
  async (category) => {
    try {
      const { data, error } = await supabase
        .from("facts")
        .select("*")
        .eq("category", category)
        .order("created_at", { ascending: false });
      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      throw error;
    }
  }
);

// Define an async thunk to add a new fact to Supabase
export const addNewFact = createAsyncThunk(
  "facts/addNewFact",
  async (newFact, { dispatch }) => {
    try {
      const { data, error } = await supabase
        .from("facts")
        .insert(newFact)
        .single();
      if (error) {
        throw error;
      }

      // Dispatch `fetchFacts` after adding a new fact is fulfilled
      dispatch(fetchFacts());
      return data;
    } catch (error) {
      throw error;
    }
  }
);

// Define an async thunk to update a fact in Supabase based on id
export const updateFact = createAsyncThunk(
  "facts/updateFact",
  async ({ id, updatedData }, { dispatch }) => {
    try {
      const { data, error } = await supabase
        .from("facts")
        .update(updatedData)
        .eq("id", id);
      if (error) {
        throw error;
      }

      // Dispatch `fetchFacts` after updating the fact is fulfilled
      dispatch(fetchFacts());
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  facts: [],
  status: "idle", // Added status to track the async operation
};

export const factsSlice = createSlice({
  name: "facts",
  initialState,
  reducers: {
    addFact: (state, action) => {
      state.facts.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFacts.pending, (state) => {
        state.status = "loading"; // Update status while fetching data
      })
      .addCase(fetchFacts.fulfilled, (state, action) => {
        state.status = "idle";
        state.facts = action.payload; // Update facts array with fetched data
      })
      .addCase(fetchFilteredFacts.pending, (state) => {
        state.status = "loading"; // Update status while fetching filtered facts
      })
      .addCase(fetchFilteredFacts.fulfilled, (state, action) => {
        state.status = "idle";
        state.facts = action.payload; // Update facts array with fetched filtered facts
      })
      .addCase(addNewFact.pending, (state) => {
        state.status = "loading"; // Update status while adding new fact
      })
      .addCase(addNewFact.fulfilled, (state) => {
        state.status = "idle"; // Set status to idle after adding new fact
      })
      .addCase(updateFact.pending, (state) => {
        state.status = "loading"; // Update status while adding new fact
      })
      .addCase(updateFact.fulfilled, (state) => {
        state.status = "idle"; // Set status to idle after adding new fact
      });
  },
});

export const { addFact } = factsSlice.actions;

export const selectFacts = (state) => state.facts.facts;

export default factsSlice.reducer;
