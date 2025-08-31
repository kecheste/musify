import { createSlice } from "@reduxjs/toolkit";

export interface Song {
  _id?: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  year?: number;
  durationSec?: number;
  createdAt?: Date;
}

interface SongsState {
  songs: Song[];
  currentSong: Song | null;
  loading: boolean;
  error: string | null;
  operation: string | null;
}

const initialSongsState: SongsState = {
  songs: [],
  currentSong: null,
  loading: false,
  error: null,
  operation: null,
}

const songSlice = createSlice({
  name: "songs",
  initialState: initialSongsState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload.loading;
      state.operation = action.payload.operation;
      state.error = null;
    },
    setError: (state, action) => { 
      state.loading = false;
      state.error = action.payload;
      state.operation = null;
    },
    fetchSongsSuccess: (state, action) => {
      state.loading = false;
      state.songs = action.payload;
      state.operation = null;
      state.error = null;
    },
    fetchSongSuccess: (state, action) => {
      state.loading = false;
      state.currentSong = action.payload;
      state.operation = null;
      state.error = null;
    },
    createSongSuccess: (state, action) => {
      state.songs.push(action.payload);
      state.loading = false;
      state.operation = null;
      state.error = null;
    },
    updateSongSuccess: (state, action) => {
      state.loading = false;
      const index = state.songs.findIndex(song => song._id === action.payload._id);
      if(index !== -1) {
        state.songs[index] = action.payload;
      }
      state.currentSong = action.payload;
      state.operation = null;
      state.error = null;
    },
    deleteSongSuccess: (state, action) => {
      state.loading = false;
      state.songs = state.songs.filter(song => song._id !== action.payload);
      state.operation = null;
      state.error = null;
    },
    clearCurrentSong: (state) => {
      state.currentSong = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  }
})

export const {
  setLoading,
  setError,
  fetchSongsSuccess,
  fetchSongSuccess,
  createSongSuccess,
  updateSongSuccess,
  deleteSongSuccess,
  clearCurrentSong,
  clearError
} = songSlice.actions;

export default songSlice.reducer;
