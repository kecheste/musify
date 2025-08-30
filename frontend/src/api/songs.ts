import type { Song } from "../store/songSlice.ts";

const API_URL = "http://localhost:3000/api/songs";

export async function getSongs(): Promise<Song[]> {
  const res = await fetch(API_URL);
  const data = await res.json();
  return data.items as Song[];
}

export async function addSong(song: Song): Promise<Song> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(song),
  });
  return res.json();
}

export async function getSong(id: string): Promise<Song> {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
}

export async function updateSong(song: Song): Promise<Song> {
  const res = await fetch(`${API_URL}/${song._id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(song),
  });
  return res.json();
}

export async function deleteSong(id: string): Promise<void> {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
}
