import { Request, Response, NextFunction } from 'express';
import Song from '../models/Song';

export async function stats(req: Request, res: Response, next: NextFunction ) {
  try {
   const [totalSongs, totalArtists, totalAlbums, totalGenre ] = await Promise.all([
      Song.estimatedDocumentCount(),
      Song.distinct("artist").then((x) => x.length),
      Song.distinct("album").then((x) => x.length),
      Song.distinct("genre").then((x) => x.length),
    ]);

    res.json({ totalSongs, totalArtists, totalAlbums, totalGenre});
  } catch (error) {
    console.log(error);
    next(error);
  }
}

