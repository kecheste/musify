import { Router } from 'express';
import { createSong, getSong, getSongs, updateSong, deleteSong } from '../controllers/songsController';

const router = Router();

router.get('/', getSongs);
router.post('/', createSong);
router.get('/:id', getSong);
router.patch('/:id', updateSong);
router.delete('/:id', deleteSong);

export default router;

