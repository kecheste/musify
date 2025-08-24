import Song from "../models/Song";
import { Request, Response, NextFunction } from 'express';

export async function createSong(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    const song = await Song.create(payload);
    res.json(song);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function getSongs(req: Request, res: Response, next: NextFunction) {
  try {
    const [items, total] = await Promise.all([
      Song.find()
        .limit(Number(10))
        .exec(),
      Song.countDocuments()
    ]);
   
   res.json({total, items});
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function getSong(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  try {
    const song = Song.findById(id);
    res.json(song);
  } catch (error) {
    console.log(error);
    next(error)
  }
}
