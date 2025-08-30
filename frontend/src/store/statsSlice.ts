import { createSlice } from "@reduxjs/toolkit";

export interface Stats {
  totalSongs: number;
  totalArtists: number;
  totalAlbums: number;
  totalGenre: number;
}

interface StatsState {
  stats: Stats | null;
  loading: boolean;
  error: string | null;
}

const initialStatsState: StatsState = {
  stats: null,
  loading: false,
  error: null,
}

const statsSlice = createSlice({
  name: "stats",
  initialState: initialStatsState,
  reducers: {
    setStatsLoading: (state, action) => {
      state.loading = action.payload;
      state.error = null;
    },
    setStatsError: (state, action) => { 
      state.loading = false;
      state.error = action.payload;
    },
    fetchStatsSuccess: (state, action) => {
      state.loading = false;
      state.stats = action.payload;
      state.error = null;
    },
    clearStatsError: (state) => {
      state.error = null;
    }
  }
})

export const {
  setStatsLoading,
  setStatsError,
  fetchStatsSuccess,
  clearStatsError
} = statsSlice.actions;

export default statsSlice.reducer;
