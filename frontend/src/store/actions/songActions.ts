import type { Song } from "../songSlice.ts";

export const fetchSongs = () => ({
  type: 'songs/fetchSongs'
});

export const fetchSong = (id: string) => ({
  type: 'songs/fetchSong',
  payload: id,
});

export const createSong = (songData: Song) => ({
  type: 'songs/createSong',
  payload: songData,
});

export const updateSong = (songData: Song) => ({
  type: 'songs/updateSong',
  payload: songData,
});

export const deleteSong = (id: string) => ({
  type: 'songs/deleteSong',
  payload: id,
});
