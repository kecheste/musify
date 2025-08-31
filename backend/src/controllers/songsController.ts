import Song from "../models/Song";
import { Request, Response, NextFunction } from "express";

export async function createSong(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const payload = req.body;
    const song = await Song.create(payload);
    res.json(song);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function getSongs(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const [items, total] = await Promise.all([
      Song.find(),
      Song.countDocuments(),
    ]);

    res.json({ total, items });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function getSong(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  console.log(id);

  try {
    const song = await Song.findById(id);
    if (!song) {
      res.status(404).send({ message: "No song found with that id." });
    }
    res.json(song);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function updateSong(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    if (!id) res.status(400).send({ message: "No id found" });

    const { title, album, artist, genre, year, durationSec } = req.body;
    if (!title || !album || !artist || !genre) {
      res.status(400).send({ message: "Song information not passed" });
    }

    const updateData: any = {
      title,
      album,
      artist,
      genre,
    };

    if (year !== undefined && year !== null && year !== "") {
      updateData.year = year;
    } else if (year === undefined || year === null || year === "") {
      updateData.$unset = { ...updateData.$unset, year: "" };
    }

    if (durationSec !== undefined && durationSec !== null && durationSec !== "") {
      updateData.durationSec = durationSec;
    } else if (durationSec === undefined || durationSec === null || durationSec === "") {
      updateData.$unset = { ...updateData.$unset, durationSec: "" };
    }

    const updatedSong = await Song.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    res.json(updatedSong);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export async function deleteSong(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    if (!id)
      res.status(400).send({ message: "No id found from the req params" });

    const song = await Song.findById(id);
    if (!song)
      res.status(400).send({ message: "Song not found or already deleted" });

    await Song.findByIdAndDelete(id);
    res.json({
      sucess: true,
      message: `Song with id ${id} deleted sucessfully!`,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}
