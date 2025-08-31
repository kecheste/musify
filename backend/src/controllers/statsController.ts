import { Request, Response, NextFunction } from "express";
import Song from "../models/Song";

export async function stats(req: Request, res: Response, next: NextFunction) {
  try {
    // Basic counts
    const [totalSongs, totalArtists, totalAlbums, totalGenre] =
      await Promise.all([
        Song.estimatedDocumentCount(),
        Song.distinct("artist").then((x) => x.length),
        Song.distinct("album").then((x) => x.length),
        Song.distinct("genre").then((x) => x.length),
      ]);

    // Detailed stats
    const [
      genreAggregation,
      artistAggregation,
      albumAggregation,
      yearAggregation,
      durationStats,
      yearRange
    ] = await Promise.all([
      // Genre stats - songs per genre
      Song.aggregate([
        { $group: { _id: "$genre", songCount: { $sum: 1 } } },
        { $sort: { songCount: -1 } },
        { $project: { _id: 0, genre: "$_id", songCount: 1 } }
      ]),

      // Artist stats - songs and albums per artist
      Song.aggregate([
        {
          $group: {
            _id: "$artist",
            songCount: { $sum: 1 },
            albums: { $addToSet: "$album" }
          }
        },
        {
          $project: {
            _id: 0,
            artist: "$_id",
            songCount: 1,
            albums: 1,
            albumCount: { $size: "$albums" }
          }
        },
        { $sort: { songCount: -1 } }
      ]),

      // Album stats - songs per album with artist and year info
      Song.aggregate([
        {
          $group: {
            _id: { album: "$album", artist: "$artist" },
            songCount: { $sum: 1 },
            year: { $first: "$year" },
            genre: { $first: "$genre" }
          }
        },
        {
          $project: {
            _id: 0,
            album: "$_id.album",
            artist: "$_id.artist",
            songCount: 1,
            year: 1,
            genre: 1
          }
        },
        { $sort: { songCount: -1 } }
      ]),

      // Year stats - songs per year
      Song.aggregate([
        { $match: { year: { $exists: true, $ne: null } } },
        { $group: { _id: "$year", songCount: { $sum: 1 } } },
        { $sort: { _id: 1 } },
        { $project: { _id: 0, year: "$_id", songCount: 1 } }
      ]),

      // Duration statistics
      Song.aggregate([
        { $match: { durationSec: { $exists: true, $ne: null } } },
        {
          $group: {
            _id: null,
            totalDuration: { $sum: "$durationSec" },
            averageDuration: { $avg: "$durationSec" },
            count: { $sum: 1 }
          }
        }
      ]),

      // Year range (oldest and newest songs)
      Song.aggregate([
        { $match: { year: { $exists: true, $ne: null } } },
        {
          $group: {
            _id: null,
            oldestSong: { $min: "$year" },
            newestSong: { $max: "$year" }
          }
        }
      ])
    ]);

    // Calculate averages
    const averageSongsPerArtist = totalArtists > 0 ? totalSongs / totalArtists : 0;
    const averageSongsPerAlbum = totalAlbums > 0 ? totalSongs / totalAlbums : 0;
    const averageAlbumsPerArtist = totalArtists > 0 ? totalAlbums / totalArtists : 0;

    // Extract duration stats
    const durationData = durationStats[0] || {};
    const totalDuration = durationData.totalDuration || 0;
    const averageDuration = durationData.averageDuration || 0;

    // Extract year range
    const yearData = yearRange[0] || {};
    const oldestSong = yearData.oldestSong;
    const newestSong = yearData.newestSong;

    const response = {
      totalSongs,
      totalArtists,
      totalAlbums,
      totalGenre,
      genreStats: genreAggregation,
      artistStats: artistAggregation,
      albumStats: albumAggregation,
      yearStats: yearAggregation,
      averageSongsPerArtist: Math.round(averageSongsPerArtist * 100) / 100,
      averageSongsPerAlbum: Math.round(averageSongsPerAlbum * 100) / 100,
      averageAlbumsPerArtist: Math.round(averageAlbumsPerArtist * 100) / 100,
      totalDuration: Math.round(totalDuration),
      averageDuration: Math.round(averageDuration),
      oldestSong,
      newestSong
    };

    res.json(response);
  } catch (error) {
    console.log(error);
    next(error);
  }
}
